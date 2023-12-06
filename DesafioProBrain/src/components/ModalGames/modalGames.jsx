import  { useState } from "react";
import PropTypes from "prop-types";
import './modalGames.css';

const ModalGames = ({ onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelection = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Escolha um jogo:</h2>
        <button onClick={() => handleGameSelection("parImpar")}>Ímpar/Par</button>
        <button onClick={() => handleGameSelection("numeroPrimo")}>Número Primo</button>
        <button onClick={() => handleGameSelection("fibonacci")}>Sequência Fibonacci</button>
        <button onClick={() => handleGameSelection("Múltiplos de 4 Pin")}>Sequência Fibonacci</button>

        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

ModalGames.propTypes = {
  onClose: PropTypes.func.isRequired, // Indica que onClose é uma função obrigatória
};

export default ModalGames;