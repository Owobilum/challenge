import { ReactElement, useEffect, useState } from 'react';

import GameSetUp from '../components/game_setup/GameSetUp';
import GamePlay from '../components/game_play/GamePlay';
import GameResult from '../components/game_result/GameResult';

export type StageType = 'start' | 'play' | 'end';

export type SnippetType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type ResultType = {
  points: number;
  accuracy: number;
  speed: number;
};

interface HomeProps {
  snippets: SnippetType[];
}

const Home = ({ snippets }: HomeProps): ReactElement => {
  const [stage, setStage] = useState<StageType>('start');
  const [paragraph, setParagraph] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState<ResultType>();

  const handleSetStage = (selectedStage: StageType) => {
    setStage(selectedStage);
  };

  const handleParagraphSelection = (text?: string) => {
    if (text) {
      setParagraph(text);
      return;
    }
    let index = Math.floor(Math.random() * snippets.length);
    setParagraph(snippets[index].body);
  };

  const handleSetDuration = (value: string) => {
    setDuration(value);
  };

  const handleResult = (res: ResultType) => {
    setResult(res);
  };

  useEffect(() => {
    handleParagraphSelection();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginTop: 32 }}>
        {stage === 'start' && (
          <GameSetUp
            setStage={handleSetStage}
            paragraph={paragraph}
            setParagraph={handleParagraphSelection}
            duration={duration}
            setDuration={handleSetDuration}
          />
        )}
        {stage === 'play' && (
          <GamePlay
            paragraph={paragraph}
            duration={duration}
            setStage={handleSetStage}
            setResult={handleResult}
          />
        )}
        {stage === 'end' && result && (
          <GameResult result={result} setStage={handleSetStage} />
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  let snippets;
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    snippets = await res.json();
  } catch (error) {}

  return {
    props: {
      snippets,
    },
  };
}

export default Home;
