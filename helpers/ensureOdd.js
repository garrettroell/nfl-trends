function ensureOdd(num) {
  if (num % 2 === 0) {
    num = num - 1;
  }
  return num;
}

export { ensureOdd };
