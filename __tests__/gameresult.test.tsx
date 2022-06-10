import { render, screen } from '../test-utils';
import GameResult from '../components/game_result/GameResult';

const result = { points: 20, accuracy: 85, speed: 30 };

test('renders gameresult component correctly', () => {
  render(<GameResult setStage={jest.fn()} result={result} />);

  const pageTitle = screen.getByRole('heading', { name: /score/i });
  expect(pageTitle).toBeInTheDocument();

  const accuracyTitle = screen.getByRole('heading', {
    name: /typing accuracy/i,
  });
  expect(accuracyTitle).toBeInTheDocument();

  const accuracyValue = screen.getByRole('heading', { name: '85%' });
  expect(accuracyValue).toBeInTheDocument();

  const speedTitle = screen.getByRole('heading', {
    name: /typing speed/i,
  });
  expect(speedTitle).toBeInTheDocument();

  const speedValue = screen.getByRole('heading', { name: '30wpm' });
  expect(speedValue).toBeInTheDocument();
});
