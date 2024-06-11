import React from 'react';
import Block from './components/block';
import GameHint from './GameHint';
import useMinesGame from './hooks/useMinesGame';
import './App.css';

export default function App() {
  const {
    blocks,
    gameHint,
    gameStatus,
    gameLevels,
    isStart,
    statuses,
    startGame,
    flagBlock,
    resetGame,
    revealBlock,
    setGameLevel,
  } = useMinesGame();

  return (
    <div>
      <h1>Mines Sweep</h1>
      <div className="controls">
        <button onClick={resetGame}>New Game</button>
        {Object.keys(gameLevels).map(level => (
          <button key={level} onClick={() => setGameLevel(gameLevels[level])}>
            {level}
          </button>
        ))}
      </div>
      <GameHint gameHint={gameHint} gameStatus={gameStatus} isStart={isStart} />
      <div className="blocks">
        {blocks.map((blockRow, index) => (
          <div key={index} className="block-row">
            {blockRow.map(block => (
              <Block
                key={Object.values(block).join('-')}
                block={block}
                disabled={gameStatus === statuses.lose || gameStatus === statuses.won}
                onReveal={(x, y) => {
                  startGame();
                  revealBlock(x, y);
                }}
                onFlag={(x, y) => { flagBlock(x, y) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
