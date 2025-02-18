import { useEffect, useState } from 'react';

import { formatSeconds } from 'src/utils/date';

interface Props {
  startSeconds: number;
  hideOnTimeout?: boolean;
  onTimeout: () => void;
}

export default function Timer({ hideOnTimeout, onTimeout, startSeconds }: Props) {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(startSeconds);

  useEffect(() => {
    setRemainingSeconds(startSeconds);

    if (startSeconds <= 0) return;

    // Set up an interval of one second
    const interval = setInterval(() => {
      setRemainingSeconds((prevSec) => prevSec - 1);
    }, 1000);

    // Clear the interval after props.startSeconds and execute onTimeout method
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onTimeout();
    }, startSeconds * 1000);

    // Cleanup function to clear interval and timeout if component unmounts
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [startSeconds, onTimeout]);

  return (
    (!hideOnTimeout || remainingSeconds > 0) && <span className='select-none'>{formatSeconds(remainingSeconds)}</span>
  );
}
