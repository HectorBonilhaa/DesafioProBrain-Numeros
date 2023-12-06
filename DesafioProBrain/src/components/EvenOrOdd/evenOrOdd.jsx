import { useState } from "react";
import "./evenOrOdd.css";

const EvenOrOdd = () => {
  const [number, setNumber] = useState("");
  const [results, setResults] = useState({});

  const isEvenOrOdd = (number) => (number % 2 === 0 ? "Par" : "Ímpar");

  const checkImplementations = () => {
    if (!number || isNaN(number) || number < 1 || number > 1000) {
      alert("Por favor, insira um número válido.");
      return;
    }
    const parsedNumber = parseInt(number);

    const newResults = {
      evenOrOdd: isEvenOrOdd(parsedNumber),
    };

    setResults(newResults);
  };

  return (
    <div className="card-number">
      <h1>Números</h1>
      <label htmlFor="numberInput">Digite um número (1-1000): </label>
      <input
        type="number"
        id="numberInput"
        min="1"
        max="1000"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={checkImplementations}>Verificar</button>
      <div>
        <p>Seu número é: {results.evenOrOdd}</p>
      </div>
    </div>
  );
};

export default EvenOrOdd;