import { useState, useEffect } from "react";
import gif0 from './assets/Gif/mainimg.gif';
import gif2 from './assets/Gif/punchpower.gif';
import gif3 from './assets/Gif/legpower.gif';
import gif4 from './assets/Gif/superlegpower.gif';
import player from './assets/Gif/sam4.gif';
import leg from './assets/Gif/same3.gif';
import power from './assets/Gif/sam35.gif';
import extrapower from './assets/Gif/samextra.gif';

function App() {
  const [randomIndex, setRandomIndex] = useState(null);
  const [showGif0, setShowGif0] = useState(true);
  const [showStartText, setShowStartText] = useState(false);
  const [score, setScore] = useState(0);
  const [enemyscore, setEnemyScore] = useState(0);
  const [playerOne, setPlayerOne] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [imgStyle, setImgStyle] = useState({ marginLeft: '300px' });
  const [winnerMessage, setWinnerMessage] = useState(""); // To show the winner message
  const gifArray = [gif2, gif3, gif4];
  const playerActionArray = [player, leg, power, extrapower];
  const [currentPlayerAction, setCurrentPlayerAction] = useState(null);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowGif0(false);
      setPlayerOne(true);
      setShowStartText(true);
      setTimeout(() => setShowStartText(false), 1000);
    }, 2000);

    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * gifArray.length);
      setRandomIndex(random);
    }, 1000);

    const handleKeyDown = (event) => {
      if (gameOver) return;

      if (event.key === "ArrowRight") {
        handlePowerClick();
      }
      if (event.key === "ArrowUp") {
        handleLegClickPower();
      }
      else if (event.key === "ArrowDown") {
        handleLegClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown); 
    };
  }, [gameOver]);

  const displayedImage = showGif0 ? gif0 : gifArray[randomIndex];

  const updateScore = (setScoreFn) => {
    setScoreFn((prev) => {
      const newScore = prev + 5;
      if (newScore >= 50) {
        setGameOver(true);
        setWinnerMessage('Player wins!'); 
      }
      return newScore;
    });
  };

  const handlePowerClick = () => {
    if (gameOver) return;

    setPlayerOne(true);
    setCurrentPlayerAction(playerActionArray[2]);
    updateScore(setScore);
  };

  const handleLegClick = () => {
    if (gameOver) return;

    setPlayerOne(true);
    setCurrentPlayerAction(playerActionArray[1]);
    updateScore(setScore);
  };

  const handleLegClickPower = () => {
    if (gameOver) return;

    setPlayerOne(true);
    setCurrentPlayerAction(playerActionArray[3]);
    updateScore(setScore);
  };

  const enemyAction = () => {
    if (gameOver) return;

    setTimeout(() => {
      const randomEnemyAction = Math.floor(Math.random() * 3);
      let scoreIncrease = randomEnemyAction === 0 ? 2 : randomEnemyAction === 1 ? 4 : 6;
      setEnemyScore((prev) => {
        const newScore = prev + scoreIncrease;
        if (newScore >= 50) {
          setGameOver(true);
          setWinnerMessage('Enemy wins!'); // Show the enemy win message
        }
        return newScore;
      });
    }, 2000);
  };

  useEffect(() => {
    if (!gameOver) {
      const enemyInterval = setInterval(enemyAction, 2000);
      return () => clearInterval(enemyInterval);
    }
  }, [enemyscore, gameOver]);

  const playerOneAction = () => {
    return (
      <div className="playerone-container">
        <p className="score-text">Player Score: {score}</p>
        <p className="score-text">Enemy Score: {enemyscore}</p>
      </div>
    );
  };

  return (
    <div id="main-container">
      {gameOver ? null : playerOneAction()}
      {showStartText && !gameOver && <p className="start-text">Let's start! Press Arrow Key ➡</p>}
      {!gameOver && (
        <img
          id="main-img"
          src={displayedImage}
          alt="action"
          style={{
            transform: showGif0 ? "scaleX(1)" : "scaleX(-1)",
            left: showGif0 ? "50%" : "70%",
            transform: showGif0 ? "translateX(-50%)" : "translateX(-50%) scaleX(-1)",
          }}
        />
      )}

      {playerOne && currentPlayerAction && !gameOver && (
        <img style={imgStyle} src={currentPlayerAction} alt="player action" id="main-img1" />
      )}
      {gameOver && (
  <div id="winner-message-container">
    <div className="winner-message">{winnerMessage}</div>
  </div>
)}
    </div>
  );
}

export default App;
