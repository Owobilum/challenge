import { ChangeEvent, ReactElement, useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import TextArea from '../textarea/TextArea';

function GameSetUp(): ReactElement {
  const [paragraph, setParagraph] = useState('');
  const [duration, setDuration] = useState('');

  const handleParagraphChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (value.length - paragraph.length === 1) {
      return;
    }
    setParagraph(value);
  };

  const handleCustomDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value && Number(value) < 1) {
      return;
    }
    setDuration(value);
  };

  const handleClick = (time: '1' | '2' | '5') => {
    setDuration(time);
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <h2 style={{ marginBottom: 0 }}>Step 1</h2>
      <p>Select your playing duration</p>

      <div style={{ width: 300, marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button size="sm" onClick={() => handleClick('1')}>
            1 minute
          </Button>
          <Button size="sm" onClick={() => handleClick('2')}>
            2 minutes
          </Button>
          <Button size="sm" onClick={() => handleClick('5')}>
            5 minutes
          </Button>
        </div>
        <div style={{ marginTop: 16 }}>
          <Input
            type="number"
            placeholder="Enter Custom Duration"
            aria-label="enter custom duration"
            value={duration}
            onChange={handleCustomDuration}
          />
        </div>
      </div>

      <h2 style={{ marginBottom: 0 }}>Step 2 (Optional)</h2>
      <p>Paste in a paragraph you would like to type</p>
      <div style={{ padding: '0 16px' }}>
        <TextArea
          cols={80}
          rows={10}
          placeholder="Paste in paragraph"
          aria-label="paste in paragraph"
          value={paragraph}
          onChange={handleParagraphChange}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <Button>Start Game</Button>
      </div>
    </div>
  );
}

export default GameSetUp;
