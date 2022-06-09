import { ReactElement } from 'react';

import type { ResultType, StageType } from '../../pages';
import Button from '../button/Button';

interface GameResultProps {
  result: ResultType;
  setStage: (state: StageType) => void;
}

function GameResult({
  result: { accuracy, speed },
  setStage,
}: GameResultProps): ReactElement {
  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <div
        style={{
          padding: 32,
          textAlign: 'center',
          border: '1px solid #000',
          borderRadius: '5px',
          minWidth: 250,
        }}
      >
        <h1>Score</h1>
        <h2>Typing Accuracy</h2>
        <h3>{`${accuracy}%`}</h3>
        <h2>Typing Speed</h2>
        <h3>{`${speed}wpm`}</h3>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <Button onClick={() => setStage('start')}>Play Again</Button>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
