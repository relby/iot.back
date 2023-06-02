const fetchApi = async (method, endpoint, data) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(data) ?? '';
  }

  return fetch(`./api/${endpoint}`, options).then((res) => res.json());
};

const createTableRow = (columns) => {
  const tr = document.createElement('tr');

  for (const column of columns) {
    const td = document.createElement('td');

    td.className = 'td-table';
    td.innerHTML = column;

    tr.append(td);
  }

  return tr;
};

const createPayButton = (meter) => {
  const btn = document.createElement('button');

  btn.className = 'btn btn-success btn-pay';
  btn.innerHTML = `${meter.cost} $`;
  btn.onclick = async () => {
    await fetchApi('POST', `meters/${meter.serial}/pay`);
    drawTableRow(await fetchApi('GET', `meters/${meter.serial}`));
  };

  const td = document.createElement('td');

  td.className = 'td-table';
  td.append(btn);

  return td;
};

const drawTable = (meters) => {
  for (const meter of meters) {
    drawTableRow(meter);
  }
};

const drawTableRow = (meter) => {
  const table = document.getElementById('table');

  const existingTr = [...table.children].find(
    (tr) => tr.children[0].innerHTML === meter.serial,
  );

  if (existingTr) {
    existingTr.children[0].innerHTML = meter.serial;
    existingTr.children[1].innerHTML = meter.description;
    existingTr.children[2].innerHTML = `${meter.consumption} Вт/ч`;
    existingTr.children[3].children[0].innerHTML = `${meter.cost} ₽`;
  } else {
    const tr = createTableRow([
      meter.serial,
      meter.description,
      `${meter.consumption} Вт/ч`,
    ]);

    tr.append(createPayButton(meter));

    table.append(tr);
  }
};

const createChart = (meters) => {
  const colors = ['red', 'green', 'purple', 'blue', 'yellow'];
  return new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      datasets: meters.map((meter, i) => ({
        data: [],
        label: meter.serial,
        borderColor: colors[i % colors.length],
        tension: 0.1,
      })),
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
    },
  });
};

const onEventSourceMessage = async ({ data }) => {
  const { serial, watts } = JSON.parse(data);

  const meter = await fetchApi('GET', `meters/${serial}`);

  drawTableRow(meter);

  const { datasets } = chart.data;

  const dataset = datasets.find((dataset) => dataset.label === meter.serial);
  if (!dataset) return;

  dataset.data.push({
    x: new Date().toTimeString().split(' ')[0],
    y: watts,
  });
};

let chart;
window.onload = async () => {
  const login = localStorage.getItem('login');

  if (login === null) {
    document.location = './login.html';
    return;
  }

  const meters = await fetchApi('GET', 'meters');

  chart = createChart(meters);
  drawTable(meters);

  const eventSource = new EventSource(`./api/sse/meters`);

  eventSource.onmessage = onEventSourceMessage;

  setInterval(() => {
    const { labels, datasets } = chart.data;

    datasets.forEach((dataset) => dataset.data.sort((a, b) => a.x - b.x));
    labels.sort();

    chart.update();
  }, 500);
};
