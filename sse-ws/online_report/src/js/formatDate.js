export default function formatDate(date) {
  let d = new Date(date);

  const addZero = (x) => ((x < 10) ? `0${x}` : x);

  const DD = addZero(d.getDate());
  const MM = addZero(d.getMonth() + 1);
  const YY = addZero(d.getFullYear() % 100);
  const HH = addZero(d.getHours());
  const mm = addZero(d.getMinutes());
  const ss = addZero(d.getSeconds());

  return `${HH}:${mm}:${ss}&nbsp;&nbsp;${DD}.${MM}.${YY}`;
};
