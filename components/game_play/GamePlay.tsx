import { ReactElement, useEffect, useState, useRef } from 'react';

import type { StageType, ResultType } from '../../pages/index';
import Button from '../button/Button';
import TextArea from '../textarea/TextArea';

interface GamePlayProps {
  paragraph: string;
  duration: string;
  setStage: (stage: StageType) => void;
  setResult: (result: ResultType) => void;
}

function GamePlay({
  paragraph,
  duration,
  setStage,
  setResult,
}: GamePlayProps): ReactElement {
  const [count, setCount] = useState(Number(duration) * 60);
  const [typedText, setTypedText] = useState('');
  const fieldRef = useRef<HTMLTextAreaElement | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds}s`;
  };

  const timer = () => {
    setCount((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const handleCheckMatch = () => {
    let score = 0;
    let typingSpeed = 0;
    let matchPercentage;
    let template = paragraph.split(' ');
    let submitted = typedText.split(' ');
    for (let i = 0; i < submitted.length; i++) {
      if (submitted[i] === template[i]) {
        score++;
      }
    }
    matchPercentage = Math.floor((score / template.length) * 100);
    let timeTaken = Number(duration) * 60 - count;
    if (submitted[0] !== '') {
      typingSpeed = Math.floor((submitted.length * 60) / timeTaken);
    }
    setResult({ points: score, accuracy: matchPercentage, speed: typingSpeed });
  };

  const handleFinish = () => {
    handleCheckMatch();
    setStage('end');
  };

  useEffect(() => {
    if (count === 0) {
      handleCheckMatch();
      setStage('end');
    }
  }, [count]);

  useEffect(() => {
    fieldRef.current?.focus();
    let id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <h6
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          margin: '0.25rem 0.5rem',
        }}
      >
        {formatTime(count)}
      </h6>
      <h6
        style={{
          fontSize: '1.25rem',
          margin: '0.5rem',
        }}
      >
        {paragraph}
      </h6>
      <div style={{ padding: '0 1rem' }}>
        <TextArea
          ref={fieldRef}
          cols={80}
          rows={10}
          placeholder="Start Typing..."
          aria-label="start typing"
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
        />
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        <Button onClick={handleFinish}>Finish</Button>
      </div>
    </div>
  );
}
export default GamePlay;
