export default function calcTileType(index, boardSize) {
  if (index === 0) return 'top-left';
  if (index < boardSize - 1) return 'top';
  if (index === boardSize - 1) return 'top-right';
  if (index === boardSize ** 2 - 1) return 'bottom-right';
  if (index > boardSize ** 2 - boardSize) return 'bottom';
  if (index === boardSize ** 2 - boardSize) return 'bottom-left';
  if (index % boardSize === 0) return 'left';
  if (index % boardSize === boardSize - 1) return 'right';
  return 'center';
}
