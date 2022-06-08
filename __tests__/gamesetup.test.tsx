import userEvent from '@testing-library/user-event';

import { render, screen } from '../test-utils';
import GameSetUp from '../components/game_setup/GameSetUp';

const user = userEvent.setup();

test('renders duration setters', () => {
  render(<GameSetUp />);
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

test('custom duration is set properly', async () => {
  render(<GameSetUp />);
  const durationInput = screen.getByRole('spinbutton', {
    name: /enter custom duration/i,
  });
  const minBtn2 = screen.getByRole('button', { name: /2 minutes/i });

  //Typing a positive number sets the duration to that number
  user.clear(durationInput);
  await user.type(durationInput, '9');
  expect(durationInput).toHaveValue(9);

  //Typing a negative number doesn't change the duration
  user.clear(durationInput);
  await user.type(durationInput, '-9');
  expect(durationInput).toHaveValue(null);

  //Clicking on a duration button sets the duration
  await user.click(minBtn2);
  expect(durationInput).toHaveValue(2);
});

test('renders textarea for pasting in text', () => {
  render(<GameSetUp />);
  const input = screen.getByRole('textbox', {
    name: /paste in paragraph/i,
  });
  expect(input).toBeInTheDocument();
});

test('pasting text updates textarea', async () => {
  render(<GameSetUp />);
  const text = 'Hello, world!';
  const input = screen.getByRole('textbox', {
    name: /paste in paragraph/i,
  });
  user.clear(input);
  expect(input).toHaveTextContent('');

  input.focus();
  await user.paste(text);
  expect(input).toHaveTextContent(text);
});

test('renders start game button', () => {
  render(<GameSetUp />);
  const btn = screen.getByRole('button', { name: /start game/i });
  expect(btn).toBeInTheDocument();
});

test('renders the correct headings', () => {
  render(<GameSetUp />);

  const heading = screen.getByRole('heading', { name: /step 1/i });
  expect(heading).toBeInTheDocument();

  const heading2 = screen.getByRole('heading', { name: 'Step 2 (Optional)' });
  expect(heading2).toBeInTheDocument();
});