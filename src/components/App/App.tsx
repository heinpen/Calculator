import { useState, useRef } from 'react';
import './App.scss';

const operands = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const operators = ['/', '×', '-', '+', '='];
const extraSymbols = ['C', 'CA', '%'];

// let operatorsInARow: number = 0;

function App() {
  const [output, setOutput] = useState<number | string>(0);
  const operatorsInARow = useRef(0);

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
    // If last symbol in string equals space then delete three symbols,
    // because it is operator(Example of operator: ' + ').
    if (string.slice(-1) === ' ') {
      return string.slice(0, -3);
    }
    // Set output to zero if user removes last symbol.
    if (string.length === 1) {
      return 0;
    }
    // Remove one symbol.
    return string.slice(0, -1);
  }

  function getNumber(string: string): number | boolean {
    // Create array from string without spaces.
    const array = string.split(' ');

    // Check if last symbol operator.
    if (operatorsInARow.current === 0 && array.length >= 1) {
      const lastSymbol = array[array.length - 1];
      return Number(lastSymbol) / 100;
    }
    return false;
  }

  function handleOperatorClick(symbol: string) {
    operatorsInARow.current += 1;

    // Prevent multiple operators in a row.
    if (operatorsInARow.current >= 3) return;
    if (operatorsInARow.current >= 2 && symbol !== '-') return;
    if (operatorsInARow.current === 2 && symbol === '-') {
      setOutput(`${output}${symbol}`);
      return;
    }

    switch (symbol) {
      case '=':
        // Block equation if output equals zero.
        if (output) {
          // eslint-disable-next-line no-eval
          setOutput(eval(String(output)));
          operatorsInARow.current = 0;
        }
        break;
      case '×':
        setOutput(`${output} * `);
        break;
      default:
        setOutput(`${output} ${symbol} `);
    }
  }

  function handleExtraSymbolClick(symbol: string) {
    switch (symbol) {
      case 'CA':
        operatorsInARow.current = 0;
        setOutput(0);
        break;
      case 'C': {
        const newOutput = removeSymbols(String(output));
        operatorsInARow.current = 0;
        setOutput(newOutput);
        break;
      }
      case '%': {
        const number = getNumber(String(output));
        if (number) {
          operatorsInARow.current = 0;
          // eslint-disable-next-line no-eval
          setOutput(eval(String(number)));
        }
      }
    }
  }

  function handleBodyClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const button = e.target as HTMLButtonElement;
    const symbol = button.innerHTML;
    // Do nothing if it is not a calculator button.
    if (!button.classList.contains('calculator__button')) return;

    if (button.classList.contains('calculator__operator')) {
      handleOperatorClick(symbol);
    } else if (button.classList.contains('calculator__extra-symbol')) {
      handleExtraSymbolClick(symbol);
    } else {
      if (output) {
        setOutput(output + symbol);
      } else {
        setOutput(symbol);
      }
      operatorsInARow.current = 0;
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
