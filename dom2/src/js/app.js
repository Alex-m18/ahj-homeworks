import DataReader from './DataReader';
import TableManager from './TableManager';
import circleSorting from './utils';

const reader = new DataReader();
const data = reader.read();

const getSortedData = circleSorting(data);

const table = new TableManager(data);
table.bindToDOM(document.querySelector('#table-container'));

setInterval(() => {
  const sortedData = getSortedData();
  table.data = sortedData.data;
  table.sortingColumn = sortedData.sortingColumn;
  table.sortingMethod = sortedData.sortingMethod;
  table.redrawTable();
}, 2000);
