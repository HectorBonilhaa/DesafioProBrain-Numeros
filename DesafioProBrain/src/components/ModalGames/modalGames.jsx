import { useState } from "react";
import PropTypes from "prop-types";
import './modalGames.css';
import EvenOrOdd from "../../pages/EvenOrOdd/evenOrOdd";
import { Link } from 'react-router-dom';


const ModalGames = ({ onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelection = (game) => {
    setSelectedGame(game);
  };

  // Adicione a navegação condicional com base no jogo selecionado
  let gameComponent;
  switch (selectedGame) {
    case "parImpar":
      gameComponent = <EvenOrOdd />;
      break;
    // Adicione casos para outros jogos, se necessário
    default:
      gameComponent = null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Escolha um jogo:</h2>
        <Link to="/evenOrOdd" style={{ textDecoration: 'none' }}>
        <button onClick={() => handleGameSelection("parImpar")}>Ímpar / Par</button>
        </Link>

        <button onClick={() => handleGameSelection("numeroPrimo")}>Número Primo</button>
        <button onClick={() => handleGameSelection("fibonacci")}>Sequência Fibonacci</button>
        <button onClick={() => handleGameSelection("Múltiplos de 4 Pin")}>Múltiplos 4 Pin</button>

        {/* Renderiza o componente do jogo selecionado, se houver */}
        {gameComponent}

        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

ModalGames.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalGames;