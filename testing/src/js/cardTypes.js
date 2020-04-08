const cardTypes = {
  mir: {
    name: 'mir',
    fullName: 'Мир',
    startDigit: 2,
    digitCount: [16],
  },
  visa: {
    name: 'visa',
    fullName: 'Visa',
    startDigit: 4,
    digitCount: [13, 16],
  },
  mastercard: {
    name: 'mastercard',
    fullName: 'MasterCard',
    startDigit: 5,
    digitCount: [16],
  },
  americanexpress: {
    name: 'americanexpress',
    fullName: 'American Express',
    startDigit: 3,
    digitCount: [15],
  },
};

export default cardTypes;
