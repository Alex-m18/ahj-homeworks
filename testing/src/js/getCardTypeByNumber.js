import cardTypes from './cardTypes';

export default function getCardTypeByNumber(number) {
  return Object.values(cardTypes).find(
    (o) => o.startDigit === Number(String(number)[0]),
  );
}
