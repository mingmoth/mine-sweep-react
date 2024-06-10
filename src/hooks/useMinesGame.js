import { useState, useEffect, useMemo } from 'react';
import { generateBlocks, checkLose, checkWin } from '../utils/logic';

export default function useMinesGame() {
  const statuses = {
    ready: 'ready',
    playing: 'playing',
    won: 'won',
    lose: 'lose',
  };

  const gameLevels = {
    easy: 'easy',
    medium: 'medium',
    hard: 'hard',
  };

  const gameLevelSettings = {
    easy: {
        width: 9,
        height: 9,
        mines: 10,
      },
      medium: {
        width: 16,
        height: 16,
        mines: 40,
      },
      hard: {
        width: 30,
        height: 16,
        mines: 99,
      },
    };
  
    const [gameStatus, setGameStatus] = useState(statuses.ready);
    const [gameLevel, setGameLevel] = useState(gameLevels.easy);
    const [blocks, setBlocks] = useState(generateBlocks(
      gameLevelSettings[gameLevel].width,
      gameLevelSettings[gameLevel].height,
      gameLevelSettings[gameLevel].mines
    ));
  
    const isStart = useMemo(() => gameStatus === statuses.playing, [gameStatus]);
  
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
      setGameLevel,
    };
  }

