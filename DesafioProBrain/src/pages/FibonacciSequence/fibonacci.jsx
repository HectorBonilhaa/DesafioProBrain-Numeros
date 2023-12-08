import { useState, useEffect, useRef } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import BackButton from "../../components/BackButton/backButton";
import musica from "../../assets/music/music_fibonacci.mp3";

const Fibonacci = () => {
  const [numberToCheck, setNumberToCheck] = useState("");
  const [isInFibonacci, setIsInFibonacci] = useState(null);

  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const cardNumberRef = useRef(null);
  const lastCheckedNumberRef = useRef(null);

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

  const generateFibonacci = () => {
    const fibonacciSequence = [0, 1];

    while (fibonacciSequence.length <= 1000) {
      const nextTerm =
        fibonacciSequence[fibonacciSequence.length - 1] +
        fibonacciSequence[fibonacciSequence.length - 2];
      fibonacciSequence.push(nextTerm);
    }

    setIsInFibonacci(
      fibonacciSequence.includes(parseInt(lastCheckedNumberRef.current, 10))
    );
  };

  const handleCheckNumber = () => {
    if (
      !numberToCheck ||
      isNaN(numberToCheck) ||
      numberToCheck < 1 ||
      numberToCheck > 1000
    ) {
      alert("Por favor, insira um número válido entre 1 e 1000.");
      return;
    }

    lastCheckedNumberRef.current = numberToCheck;

    generateFibonacci();
    setNumberToCheck("");
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
        <h1>Game Sequência de Fibonacci</h1>
        <label htmlFor="numberToCheckInput">Insira um número (1-1000):</label>
        <input
          type="number"
          id="numberToCheckInput"
          value={numberToCheck}
          onChange={(e) => setNumberToCheck(e.target.value)}
        />
        <button className="btn-form" onClick={handleCheckNumber} data-testid="send-form">
          Verificar
        </button>

        {isInFibonacci !== null && (
          <p data-testid="result-text" style={{ color: isInFibonacci ? "green" : "red" }}>
            O número {lastCheckedNumberRef.current}{" "}
            {isInFibonacci ? "está" : "não está"} na sequência de fibonacci
          </p>
        )}
      </div>
    </div>
  );
};

export default Fibonacci;
