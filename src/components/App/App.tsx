import { useState } from 'react';
import './App.scss';

const operands = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const operators = ['/', '×', '-', '+', '='];
const extraSymbols = ['C', 'CA', '%'];
let operatorsInARow = 0;
function App() {
  const [output, setOutput] = useState<number | string>(0);

  function createOperandCell(opd: string) {
    return (
      <button
        type="button"
        className="calculator__operand calculator__button"
        key={opd}
      >
        {opd}
      </button>
    );
  }

  function createOperatorCell(opr: string) {
    return (
      <button
        type="button"
        className="calculator__operator calculator__button"
        key={opr}
      >
        {opr}
      </button>
    );
  }

  function createExtraSymbols(sym: string) {
    return (
      <button
        type="button"
        className="calculator__extra-symbol calculator__button"
        key={sym}
      >
        {sym}
      </button>
    );
  }

  function removeSymbols(string: string) {
    if (string.slice(-1) === ' ') {
      return string.slice(0, -3);
    }
    if (string.length === 1) {
      return 0;
    }
    return string.slice(0, -1);
  }

  function getNumber(string: string): number | boolean {
    // Create array from string without spaces.
    const array = string.split(' ');

    // Check if last symbol operator.
    if (operatorsInARow === 0 && array.length >= 1) {
      const lastSymbol = array[array.length - 1];
      return Number(lastSymbol) / 100;
    }
    return false;
  }

  function handleBodyClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const button = e.target as HTMLButtonElement;
    const symbol = button.innerHTML;

    if (button.classList.contains('calculator__button')) {
      if (button.classList.contains('calculator__operator')) {
        operatorsInARow += 1;

        if (operatorsInARow >= 3) return;
        if (operatorsInARow >= 2 && symbol !== '-') return;
        if (operatorsInARow === 2 && symbol === '-') {
          setOutput(`${output}${symbol}`);
          return;
        }

        if (symbol === '=') {
          if (output) {
            // eslint-disable-next-line no-eval
            setOutput(eval(String(output)));
            operatorsInARow = 0;
            return;
          }
        } else if (symbol === '×') {
          setOutput(`${output} * `);
          return;
        } else if (output) {
          setOutput(`${output} ${symbol} `);
          return;
        }
      }
      if (button.classList.contains('calculator__extra-symbol')) {
        if (symbol === 'CA') {
          operatorsInARow = 0;
          setOutput(0);
          return;
        }
        if (symbol === 'C') {
          const newOutput = removeSymbols(String(output));
          operatorsInARow = 0;
          setOutput(newOutput);
          return;
        }

        if (symbol === '%') {
          const number = getNumber(String(output));
          if (number) {
            operatorsInARow = 0;
            // eslint-disable-next-line no-eval
            setOutput(eval(String(number)));
            return;
          }
          return;
        }
      }
      if (output) {
        setOutput(output + symbol);
        operatorsInARow = 0;
      } else {
        setOutput(symbol);
        operatorsInARow = 0;
      }
    }
  }
  return (
    <>
      <div className="calculator__head">
        <div className="calculator__history">
          {}
        </div>
        <span className="calculator__output">{output}</span>
      </div>

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className="calculator__body" onClick={(e) => handleBodyClick(e)}>
        <div className="calculator__extra-symbols">
          {extraSymbols.map(createExtraSymbols)}
        </div>
        <div className="calculator__operands">
          {operands.map((e) => createOperandCell(e))}
        </div>

        <div className="calculator__operators">
          {operators.map(createOperatorCell)}
        </div>
      </div>
    </>
  );
}

export default App;
