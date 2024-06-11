import React, { useEffect } from 'react';
import useTimer from './hooks/useTimer';
import { statuses } from './config/game'

export default function Gamehint({ gameHint, gameStatus, isStart }) {
  const {
    count,
    startCount,
    seconds,
    endCount,
  } = useTimer();

  useEffect(() => {
    if (isStart) {
      startCount();
      count();
    } else {
      endCount();
    }
  }, [isStart]);

  useEffect(() => {
    if (gameStatus === statuses.lose || gameStatus === statuses.won) {
      endCount();
      setTimeout(() => {
        alert(`You ${gameStatus}!`);
      }, 200);
    }
  }, [gameStatus]);

  return (
    <div className="hint">
      <span>{gameHint}</span> {isStart && <span>{seconds}s</span>}
    </div>
  )
}
