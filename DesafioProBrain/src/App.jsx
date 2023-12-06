import { useState, useRef, useEffect } from "react";
import ModalGames from "./components/ModalGames/modalGames";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import "./App.css";

// Importe a música
import musica from "./assets/music/home_music.mp3";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const handleGifClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    audioRef.current.muted = !audioRef.current.muted;
  };

  const handleStartAudio = () => {
    audioRef.current.play().catch((error) => {
      console.error("Erro ao reproduzir áudio:", error);
    });
  };

  useEffect(() => {
    // Inicia a reprodução automática do áudio quando o componente é montado
    handleStartAudio();

    // Adiciona um ouvinte de clique no componente para iniciar a reprodução
    document.addEventListener("click", handleStartAudio);

    return () => {
      // Remove o ouvinte quando o componente for desmontado
      document.removeEventListener("click", handleStartAudio);
    };
  }, []); // O array vazio assegura que o useEffect seja executado apenas uma vez, equivalente ao componentDidMount

  return (
    <div className="container">
      <audio loop ref={audioRef}>
        {/* Use o caminho relativo para a música */}
        <source src={musica} type="audio/mp3" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      <img
        src="https://media.giphy.com/media/DebhXJUVWmyNDTt8Lv/giphy.gif"
        alt="GIF"
        className="gif"
        onClick={handleGifClick}
      />
      <h1 className="main-text">
        Vamos Jogar um jogo?
        <button className="audio-btn" onClick={handleToggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </h1>
      {isModalOpen && <ModalGames onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
