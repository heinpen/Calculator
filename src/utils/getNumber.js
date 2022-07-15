// eslint-disable-next-line import/prefer-default-export
export default function getNumber(operatorsInARow, sty) {
  // Create array from string without spaces.
  const array = sty.split(' ');

  // Check if the last symbol is operator.
  if (operatorsInARow.current === 0 && array.length >= 1) {
    const lastSymbol = array[array.length - 1];
    return Number(lastSymbol) / 100;
  }
  return false;
}