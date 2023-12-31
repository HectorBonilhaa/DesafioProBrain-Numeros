import { useState, useEffect, useRef } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import musica from "../../assets/music/music_prime_number.mp3";
import BackButton from "../../components/BackButton/backButton";

const PrimeNumber = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const cardNumberRef = useRef(null);

  const checkNumber = () => {
    const parsedNumber = parseInt(number, 10);

    if (isNaN(parsedNumber) || parsedNumber < 1 || parsedNumber > 1000) {
      setResult("Por favor, insira um número válido entre 1 e 1000.");
      return;
    }

    // Implementação 2 - Número primo ou não
    const isPrime = checkPrime(parsedNumber);
    setResult(`O número ${parsedNumber} ${isPrime ? "é" : "não é"} primo.`);
    setNumber("");
  };

  const checkPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };

  const handleToggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    audioRef.current.muted = !audioRef.current.muted;
  };

  const handleStartAudio = () => {
    try {
      handleToggleMute();
      audioRef.current.volume = 0.2;
      audioRef.current.play();
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        cardNumberRef.current &&
        !cardNumberRef.current.contains(event.target)
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
    <div>
      <BackButton />

      <div className="card-number" ref={cardNumberRef}>
        <audio loop ref={audioRef}>
          <source src={musica} type="audio/mp3" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
        <button className="audio-btn" onClick={handleToggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <h1>Game Números Primos</h1>
        <label htmlFor="numberInput">Insira um número (1-1000):</label>
        <input
          type="number"
          id="numberInput"
          min="1"
          max="1000"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button
          className="btn-form"
          onClick={checkNumber}
          data-testid="send-form"
        >
          Verificar
        </button>
        <div>
          <p data-testid="result-text"> {result}</p>
        </div>
      </div>
    </div>
  );
};

export default PrimeNumber;
