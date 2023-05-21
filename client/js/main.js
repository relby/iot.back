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
    existingTr.children[2].innerHTML = `${meter.consumption} Вт`;
    existingTr.children[3].children[0].innerHTML = `${meter.cost} $`;
  } else {
    const tr = createTableRow([
      meter.serial,
      meter.description,
      `${meter.consumption} Вт`,
    ]);

    tr.append(createPayButton(meter));

    table.append(tr);
  }
};

const createChart = (meters) => {
  return new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: meters.map((meter) => ({
        data: [],
        label: meter.serial,
        // TODO: move to utils function
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        tension: 0.1,
      })),
    },
  });
};

const onEventSourceMessage = async ({ data }) => {
  const { serial, watts } = JSON.parse(data);

  const meter = await fetchApi('GET', `meters/${serial}`);

  drawTableRow(meter);

  const { labels, datasets } = chart.data;

  const dataset = datasets.find((dataset) => dataset.label === meter.serial);
  if (!dataset) return;

  const maxDatasetLength = Math.max(
    ...datasets.map(({ data: { length } }) => length),
  );

  if (maxDatasetLength > labels.length) {
    labels.push(new Date().toLocaleString());
  }

  dataset.data.push(watts);
  chart.update();
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
};
