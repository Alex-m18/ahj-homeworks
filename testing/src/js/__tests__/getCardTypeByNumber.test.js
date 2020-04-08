import getCardTypeByNumber from '../getCardTypeByNumber';
import cardTypes from '../cardTypes';

test.each([
  ['mir', '2', cardTypes.mir],
  ['visa', '4', cardTypes.visa],
  ['mastercard', '5', cardTypes.mastercard],
  ['americanexpress', '3', cardTypes.americanexpress],
])('should return type %s', (_, input, expected) => {
  expect(getCardTypeByNumber(input)).toMatchObject(expected);
});
