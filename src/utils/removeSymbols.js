export default function removeSymbols(string) {
  // If the last symbol in string is space then delete three symbols,
  // because it is an operator (Example of operator: ' + ').
  if (string.slice(-1) === ' ') {
    return string.slice(0, -3);
  }
  // Set the output to zero if user removes the last symbol.
  if (string.length === 1) {
    return 0;
  }
  // Remove one symbol.
  return string.slice(0, -1);
}