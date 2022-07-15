import getNumber from './getNumber';

describe('return value', () => {
  test('is number', () => {
    expect(typeof getNumber({ current: 0 }, '3')).toBe('number');
  });
  test('is boolean', () => {
    expect(typeof getNumber({ current: 1 }, '3')).toBe('boolean');
  });
});