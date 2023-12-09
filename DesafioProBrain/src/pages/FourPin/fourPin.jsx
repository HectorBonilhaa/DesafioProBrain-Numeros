import { useState, useEffect, useRef } from "react";
import "./fourPin.css";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import musica from "../../assets/music/music_four_pin.mp3";
import BackButton from "../../components/BackButton/backButton";

const FourPin = () => {
  const [number, setNumber] = useState("");
  const [sequence, setSequence] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const cardNumberRef = useRef(null);

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

  const buildSequence = () => {
    if (!number || isNaN(number) || number <= 0 && number >= 1000) {
      alert("Por favor, insira um número válido maior que zero e menor que 1000.");
      return;
    }

    const newSequence = [];
    for (let i = 1; i <= number; i++) {
      let style = "";

      if (i % 4 === 0) {
        style = "pin";
        newSequence.push({ value: `${i} pin`, style });
      } else if (i % 2 === 0) {
        style = "par";
        newSequence.push({ value: i, style });
      } else {
        style = "impar";
        newSequence.push({ value: i, style });
      }
    }
    setSequence(newSequence);
    setNumber("");

    if (parseInt(number, 10) > 15 && cardNumberRef.current) {
      cardNumberRef.current.scrollTop = cardNumberRef.current.scrollHeight;
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
        <h1>Game Múltiplos de 4 = Pin</h1>
        <label htmlFor="numberInput">Insira um número:</label>
        <input
          type="number"
          id="numberInput"
          min="1"
          max="100"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required={true}
        />
        <button className="btn-form" onClick={buildSequence} data-testid="send-form">
          Gerar Sequência
        </button>
        <ul className="list-number">
          {sequence.map((item, index) => (
            <li id="items-list" key={index} className={item.style} data-testid="result-items">
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FourPin;
