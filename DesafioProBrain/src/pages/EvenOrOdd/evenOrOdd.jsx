import { useState, useEffect, useRef } from "react";
import "./evenOrOdd.css";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import musica from "../../assets/music/music_even_odd.mp3";
import BackButton from "../../components/BackButton/backButton";

const EvenOrOdd = () => {
  const [number, setNumber] = useState("");
  const [results, setResults] = useState({});
  const [resultClass, setResultClass] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const cardNumberRef = useRef(null);

  const isEvenOrOdd = (number) => (number % 2 === 0 ? "Par" : "Ímpar");

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

  const checkImplementations = () => {
    if (!number || isNaN(number) || number < 1 || number > 1000) {
      alert("Por favor, insira um número válido.");
      return;
    }
    const parsedNumber = parseInt(number);
    const parity = isEvenOrOdd(parsedNumber);

    const newResults = {
      evenOrOdd: parity,
    };

    setResults(newResults);

    setResultClass(parity === "Par" ? "par-result" : "impar-result");

    setNumber("");
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

        <h1>Game Par ou Ímpar</h1>
        <label htmlFor="numberInput">Digite um número (1-1000): </label>
        <input
          type="number"
          id="numberInput"
          min="1"
          max="1000"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button className="btn-form" onClick={checkImplementations}>
          Verificar
        </button>
        <div>
          <p>
            Seu número é:
            <span className={`result ${resultClass}`}>
              {" "}
              {results.evenOrOdd}
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvenOrOdd;
