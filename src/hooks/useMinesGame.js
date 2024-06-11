import { useState, useEffect, useMemo } from 'react';
import { generateBlocks, checkLose, checkWin, revealBlock as reveal } from '../utils/logic';
import { statuses, gameLevels, gameLevelSettings } from '../config/game'

export default function useMinesGame() {
  const [gameStatus, setGameStatus] = useState(statuses.ready);
  const [gameLevel, setGameLevel] = useState(gameLevels.easy);
  const [blocks, setBlocks] = useState(generateBlocks(
    gameLevelSettings[gameLevel].width,
    gameLevelSettings[gameLevel].height,
    gameLevelSettings[gameLevel].mines
  ));

  const isStart = useMemo(() => gameStatus !== statuses.ready, [gameStatus]);

  const gameHint = useMemo(() => {
    if (gameStatus === statuses.playing) {
      return `Time:`;
    } else if (gameStatus === statuses.ready) {
      return 'Click to start';
    } else {
      return 'Start new game';
    }
  }, [gameStatus]);

  function startGame() {
    if (gameStatus === statuses.ready) {
      setGameStatus(statuses.playing);
    }
  }

  function revealBlock(x, y) {
    setBlocks(prevBlocks => {
      const newBlocks = structuredClone(prevBlocks);
      reveal(newBlocks, x, y);
      return newBlocks;
    });
  }

  function flagBlock(x, y) {
    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      newBlocks[x][y].flagged = !newBlocks[x][y].flagged;
      return newBlocks;
    });
  }

  function resetGame() {
    setGameStatus(statuses.ready);
    setBlocks(generateBlocks(
      gameLevelSettings[gameLevel].width,
      gameLevelSettings[gameLevel].height,
      gameLevelSettings[gameLevel].mines
    ));
  }

  function checkGameStatus() {
    if (checkLose(blocks)) {
      setGameStatus(statuses.lose);
    } else if (checkWin(blocks)) {
      setGameStatus(statuses.won);
    }
  }

  useEffect(() => {
    resetGame();
  }, [gameLevel]);

  useEffect(() => {
    checkGameStatus();
  }, [blocks])

  return {
    blocks,
    gameHint,
    gameStatus,
    gameLevel,
    gameLevels,
    isStart,
    statuses,
    checkGameStatus,
    startGame,
    flagBlock,
    resetGame,
    revealBlock,
    setGameLevel,
  };
}

