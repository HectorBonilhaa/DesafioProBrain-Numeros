import { useState, useRef, useEffect } from "react";
import ModalGames from "../../components/ModalGames/modalGames";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import "./home.css";
import musica from "../../assets/music/home_music.mp3";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

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
    handleToggleMute();
    audioRef.current.volume = 0.2;
    audioRef.current.play().catch((error) => {
      console.error("Erro ao reproduzir áudio:", error);
    });
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        handleStartAudio();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <p className="text-header">Clique no gif abaixo e escolha seu game!</p>
      <img
        src="https://media.giphy.com/media/DebhXJUVWmyNDTt8Lv/giphy.gif"
        alt="GIF"
        className="gif"
        onClick={handleGifClick}
      />
      <div className="mid-container">
        <h1 className="main-text">Vamos Jogar um jogo?</h1>

        <audio loop ref={audioRef}>
          <source src={musica} type="audio/mp3" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
        <button className="audio-btn" onClick={handleToggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
      {isModalOpen && <ModalGames onClose={handleCloseModal} />}
    </div>
  );
}

export default HomePage;
