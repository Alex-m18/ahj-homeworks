export default function luhn(number) {
  let sum = 0;
  const arr = [...number].reverse().map((o) => Number(o));
  for (let i = 0; i < arr.length; i += 1) {
    if (i % 2 !== 0) {
      let mul = arr[i] * 2;
      if (mul > 9) mul -= 9;
      sum += mul;
    } else {
      sum += arr[i];
    }
  }
  return sum % 10 === 0;
}
