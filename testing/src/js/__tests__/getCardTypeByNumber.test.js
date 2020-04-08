import getCardTypeByNumber from '../getCardTypeByNumber';
import cardTypes from '../cardTypes';

test.each([
  ['mir', '2', cardTypes.mir],
  ['visa', '4', cardTypes.visa],
  ['mastercard', '3', cardTypes.mastercard],
  ['americanexpress', '6', cardTypes.americanexpress],
])('should return type %s', (_, input, expected) => {
  expect(getCardTypeByNumber(input)).toMatchObject(expected);
});
