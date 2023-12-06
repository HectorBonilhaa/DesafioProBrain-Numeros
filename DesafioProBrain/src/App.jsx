import { useState } from "react";
import ModalGames from "./components/ModalGames/modalGames";

import "./App.css";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGifClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <img
        src="https://media.giphy.com/media/DebhXJUVWmyNDTt8Lv/giphy.gif"
        alt="GIF"
        className="gif"
        onClick={handleGifClick}
      />
      <h1 className="main-text">Vamos Jogar um jogo? 🎮</h1>
      {isModalOpen && <ModalGames onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
