import React, { useState, useRef, useEffect } from "react";
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

    // Inicia o áudio apenas quando o usuário interagir e não estiver mutado
    if (!isMuted) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir áudio:", error);
      });
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        // Inicia o áudio apenas quando o usuário interagir e não estiver mutado
        if (!isMuted) {
          audioRef.current.volume = 0.2;
          audioRef.current.play().catch((error) => {
            console.error("Erro ao reproduzir áudio:", error);
          });
        }
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isMuted]);

  return (
    <div className="container" ref={containerRef}>
      <p className="text-header">Clique no gif abaixo e escolha seu game!</p>
      <img
        src="https://media.giphy.com/media/DebhXJUVWmyNDTt8Lv/giphy.gif"
        alt="GIF"
        className="gif"
        id="mouse-gif"
        onClick={handleGifClick}
      />
      <div className="mid-container">
        <h1 className="main-text">Vamos Jogar um jogo?</h1>

        <audio loop ref={audioRef} data-testid="audio-element">
          <source src={musica} type="audio/mp3" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
        <button className="audio-btn" onClick={handleToggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
      <div data-testid="modal">
        {isModalOpen && <ModalGames onClose={handleCloseModal} />}
      </div>
    </div>
  );
}

export default HomePage;
