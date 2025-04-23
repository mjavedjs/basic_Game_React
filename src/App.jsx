import { useState, useEffect } from "react";
import gif0 from './assets/Gif/mainimg.gif';
import gif2 from './assets/Gif/punchpower.gif';
import gif3 from './assets/Gif/legpower.gif';
import gif4 from './assets/Gif/superlegpower.gif';
import player from './assets/Gif/sam4.gif';
import leg from './assets/Gif/same3.gif';
import power from './assets/Gif/sam35.gif';
import extrapower from  './assets/Gif/samextra.gif'
function App() {
  const [randomIndex, setRandomIndex] = useState(null);
  const [showGif0, setShowGif0] = useState(true);
  const [showStartText, setShowStartText] = useState(false);
  const [score, setScore] = useState(0);
  const [playerOne, setPlayerOne] = useState(false);
  const gifArray = [gif2, gif3, gif4];
  const playerActionArray = [player, leg, power,extrapower];
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
      if (event.key === "ArrowRight") {
        handlePowerClick();
      } 
      if (event.key === "ArrowUp") {
        handleLegClickPower()
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
  }, []);

  const displayedImage = showGif0 ? gif0 : gifArray[randomIndex];

  const handlePowerClick = () => {
    setPlayerOne(true);
    setCurrentPlayerAction(playerActionArray[2]); 
    setScore((prev) => prev + 5); 
  };

  const handleLegClick = () => {
    setPlayerOne(true);
    setCurrentPlayerAction(playerActionArray[1]); 
  };
  const handleLegClickPower = () => {
    setPlayerOne(true);
    setCurrentPlayerAction(playerActionArray[3]); 
  };

  const playerOneAction = () => {
    return (
      <div className="playerone-container">
        <p className="score-text">{score}</p>
        {/* <button className="sf-btn" onClick={handlePowerClick}>Power</button>
        <button className="sf-btn" onClick={handleLegClick}>Leg</button> */}
      </div>
    );
  };

  return (
    <>
      <div id="main-container">
        {playerOneAction()}
        {showStartText && <p className="start-text">Let's start! Press Arrow Key ➡</p>}

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

        {playerOne && currentPlayerAction && (
          <img src={currentPlayerAction} alt="player action" id="main-img1" />
        )}
      </div>
    </>
  );
}

export default App;
