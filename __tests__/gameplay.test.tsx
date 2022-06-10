import { render, screen } from '../test-utils';
import GamePlay from '../components/game_play/GamePlay';

const paragraph = 'I framer went to stall';

test('renders gameplay component correctly', () => {
  render(
    <GamePlay
      setStage={jest.fn()}
      setResult={jest.fn()}
      paragraph={paragraph}
      duration={'12'}
    />
  );

  const textToType = screen.getByRole('heading', { name: paragraph });
  expect(textToType).toBeInTheDocument();

  const finishBtn = screen.getByRole('button', { name: /finish/i });
  expect(finishBtn).toBeInTheDocument();

  const input = screen.getByRole('textbox', {
    name: /start typing/i,
  });
  expect(input).toBeInTheDocument();

  const timer = screen.getByRole('heading', { name: '12:0s' });
  expect(timer).toBeInTheDocument();
});
