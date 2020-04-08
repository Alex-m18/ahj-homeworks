import luhn from '../luhn';

test.each([
  ['true', '4276550011117820', true],
  ['true', '4275', true],
  ['false', '4276550011117821', false],
  ['false', '4276550011117822', false],
  ['false', '4276550011117823', false],
  ['false', '4276550011117824', false],
  ['false', '4276550011117825', false],
  ['false', '4276550011117826', false],
  ['false', '4276550011117827', false],
  ['false', '4276550011117828', false],
  ['false', '4276550011117829', false],
  ['false', '4276555011117820', false],
])('should return %s', (_, input, expected) => {
  expect(luhn(input)).toBe(expected);
});
