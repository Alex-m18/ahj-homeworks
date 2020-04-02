export default function circleSorting(data) {
  let sortingColumn = 0;
  let sortingMethod = 'asc';
  const { length } = Object.keys(data[0]);

  const comparator = (a, b) => {
    if (sortingMethod === 'asc') return Object.values(a)[sortingColumn] > Object.values(b)[sortingColumn];
    return Object.values(a)[sortingColumn] < Object.values(b)[sortingColumn];
  };

  return () => {
    sortingMethod = (sortingMethod === 'asc') ? 'desc' : 'asc';
    if (sortingMethod === 'asc') sortingColumn = (sortingColumn + 1) % length;
    const newData = data.sort(comparator);
    return { data: newData, sortingColumn, sortingMethod };
  };
}
