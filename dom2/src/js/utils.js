export default function circleSorting(data) {
  let sortingColumn = 0;
  let sortingMethod = 'asc';
  const { length } = Object.keys(data[0]);

  const comparator = (a, b) => {
    if (sortingMethod === 'asc') {
      if (Object.values(a)[sortingColumn] > Object.values(b)[sortingColumn]) return 1;
      return -1;
    }
    if (Object.values(a)[sortingColumn] > Object.values(b)[sortingColumn]) return -1;
    return 1;
  };

  return () => {
    sortingMethod = (sortingMethod === 'asc') ? 'desc' : 'asc';
    if (sortingMethod === 'asc') sortingColumn = (sortingColumn + 1) % length;
    data.sort(comparator);
    return { data, sortingColumn, sortingMethod };
  };
}
