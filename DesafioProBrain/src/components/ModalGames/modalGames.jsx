import PropTypes from "prop-types";
import "./modalGames.css";

import { Link } from "react-router-dom";

const ModalGames = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Escolha um jogo:</h2>
        <Link to="/evenOrOdd" style={{ textDecoration: "none" }}>
          <button>Ímpar / Par</button>
        </Link>

        <Link to="/primeNumber" style={{ textDecoration: "none" }}>
          <button>Número Primo</button>
        </Link>
        <Link to="/fibonacci" style={{ textDecoration: "none" }}>
          <button>Sequência Fibonacci</button>
        </Link>
        <Link to="/fourPin" style={{ textDecoration: "none" }}>
          <button>Múltiplos 4 Pin</button>
        </Link>

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
