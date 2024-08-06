import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer;
    if (gameStarted) {
      timer = setInterval(() => {
        setTime((prevTime) => (parseFloat(prevTime) + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameStarted]);

  const handlePlayClick = () => {
    if (points > 0) {
      setMessage("");
      setNumbers(generateNumbers(points));
      setGameStarted(true);
      setTime(0);
      setCurrentIndex(0);
    }
  };

  const generateNumbers = (count) => {
    return Array.from({ length: count }, (_, i) => i + 1).map((number) => ({
      number,
      left: Math.random() * 80,
      top: Math.random() * 80,
      visible: true,
    }));
  };

  const handleNumberClick = (number) => {
    if (!gameStarted) return;

    if (number === currentIndex + 1) {
      setTimeout(() => {
        setNumbers((prevNumbers) =>
          prevNumbers.map((n) =>
            n.number === number ? { ...n, visible: false } : n
          )
        );
      }, 1000);
      if (number === points) {
        setGameStarted(false);
        setMessage("ALL CLEARED");
      }
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setGameStarted(false);
      setMessage("GAME OVER");
    }
  };

  return (
    <>
      <div className="ClearThePoint">
        <h2
          style={{
            margin: "8px 0",
            textTransform: "uppercase",
            color:
              message === "GAME OVER"
                ? "red"
                : message === "ALL CLEARED"
                ? "green"
                : "black",
          }}
        >
          {message || "Let's play"}
        </h2>
        <div className="points">
          <p>Points: </p>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
        <div className="time">
          <p>Time:</p>
          <span>{time}s</span>
        </div>
        <button className="play" onClick={handlePlayClick}>
          {gameStarted ? "Restart" : "Play"}
        </button>
        <div className="box-game">
          {numbers.map(({ number, left, top, visible }) => (
            <div
              key={number}
              className={`number ${
                !visible ? "hidden" : currentIndex >= number ? "active" : ""
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={() => visible && handleNumberClick(number)}
            >
              {number}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
