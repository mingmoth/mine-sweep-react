import { useState, useEffect, useRef } from 'react';

export default function useTimer() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const seconds = Math.round((end - start) / 1000);

  function startCount() {
    const now = Date.now();
    setStart(now);
    setEnd(now);
  }

  function endCount() {
    clearInterval(intervalId);
    setIntervalId(null);
  }

  function count() {
    if (intervalId) return;

    const id = setInterval(() => {
      setEnd(Date.now());
    }, 1000);
    setIntervalId(id);
  }

  return {
    startCount,
    endCount,
    count,
    seconds,
  };
}
