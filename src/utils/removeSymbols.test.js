import removeSymbols from './removeSymbols';

describe('return value', () => {
  test('is string', () => {
    expect(typeof removeSymbols('1 + 2')).toBe('string');
  });
  test('is zero', () => {
    expect(removeSymbols('1')).toBe(0);
    expect(removeSymbols('3')).toBe(0);
    expect(removeSymbols('+')).toBe(0);
    expect(removeSymbols('-')).toBe(0);
  });
  test('is right slice', () => {
    // expect to remove three
    expect(removeSymbols('1 + 4 + ')).toBe('1 + 4');
    expect(removeSymbols('1 + 4324 + ')).toBe('1 + 4324');
    expect(removeSymbols('321 + 4324 + ')).toBe('321 + 4324');

    // expect to remove one symbol and number
    expect(removeSymbols('1 - 4324')).toBe('1 - 432');
  });
});