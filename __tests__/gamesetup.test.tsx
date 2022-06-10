import { render, screen } from '../test-utils';
import GameSetUp from '../components/game_setup/GameSetUp';

const paragraph = 'I framer went to stall';

test('renders duration setters', () => {
  render(
    <GameSetUp
      setStage={jest.fn()}
      setParagraph={jest.fn()}
      paragraph={paragraph}
      duration={''}
      setDuration={jest.fn()}
    />
  );
  const minBtn1 = screen.getByRole('button', { name: /1 minute/i });
  const minBtn2 = screen.getByRole('button', { name: /2 minutes/i });
  const minBtn5 = screen.getByRole('button', { name: /5 minutes/i });
  const customMinInput = screen.getByRole('spinbutton', {
    name: /enter custom duration/i,
  });
  expect(minBtn1).toBeInTheDocument();
  expect(minBtn2).toBeInTheDocument();
  expect(minBtn5).toBeInTheDocument();
  expect(customMinInput).toBeInTheDocument();
});

test('renders textarea for pasting in text', () => {
  render(
    <GameSetUp
      setStage={jest.fn()}
      setParagraph={jest.fn()}
      paragraph={paragraph}
      duration={''}
      setDuration={jest.fn()}
    />
  );
  const input = screen.getByRole('textbox', {
    name: /paste in paragraph/i,
  });
  expect(input).toBeInTheDocument();
});

test('user is presented with paragraph to type', async () => {
  render(
    <GameSetUp
      setStage={jest.fn()}
      setParagraph={jest.fn()}
      paragraph={paragraph}
      duration={''}
      setDuration={jest.fn()}
    />
  );
  const input = screen.getByRole('textbox', {
    name: /paste in paragraph/i,
  });
  expect(input).toHaveTextContent(paragraph);
});

test('renders start game button', () => {
  render(
    <GameSetUp
      setStage={jest.fn()}
      setParagraph={jest.fn()}
      paragraph={paragraph}
      duration={''}
      setDuration={jest.fn()}
    />
  );
  const btn = screen.getByRole('button', { name: /start game/i });
  expect(btn).toBeInTheDocument();
});

test('renders the correct headings', () => {
  render(
    <GameSetUp
      setStage={jest.fn()}
      setParagraph={jest.fn()}
      paragraph={paragraph}
      duration={''}
      setDuration={jest.fn()}
    />
  );

  const heading = screen.getByRole('heading', { name: /step 1/i });
  expect(heading).toBeInTheDocument();

  const heading2 = screen.getByRole('heading', { name: 'Step 2 (Optional)' });
  expect(heading2).toBeInTheDocument();
});
