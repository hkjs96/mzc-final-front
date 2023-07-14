import React, { useState, useEffect, useRef } from 'react';

function TimeComponent() {
  const [remainingTime, setRemainingTime] = useState(0);
  const remainingTimeRef = useRef(remainingTime);

  useEffect(() => {
    // Calculate the remaining time until midnight
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeDifference = midnight.getTime() - now.getTime();

    // Set the initial remaining time
    setRemainingTime(Math.floor(timeDifference / 1000));
    remainingTimeRef.current = Math.floor(timeDifference / 1000);

    // Start the countdown timer
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        const updatedTime = prevTime - 1;
        remainingTimeRef.current = updatedTime;
        return updatedTime;
      });
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Format the remaining time as hours, minutes, and seconds
  const hours = Math.floor(remainingTimeRef.current / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((remainingTimeRef.current % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (remainingTimeRef.current % 60)
    .toString()
    .padStart(2, '0');

  return (
    <div className="main-today">
      {/* Consider adding a timer */}
      <div className="timer ready" style={{ display: 'flex', alignItems: 'center' }}>
        <span className="clock" style={{ marginRight: '10px' }}></span>
        <span className="nums h" style={{ color: '#F23030', fontSize: 25 }}>
          {`${hours}:${minutes}:${seconds}`}
        </span>
      </div>
    </div>
  );
}

export default TimeComponent;
