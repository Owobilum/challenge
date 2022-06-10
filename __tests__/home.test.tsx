import userEvent from '@testing-library/user-event';

import { render, screen } from '../test-utils';
import Home from '../pages/index';

const snippets = [
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitaesequi sint nihil',
  },
];

const user = userEvent.setup();

it('duration is set correctly', async () => {
  render(<Home snippets={snippets} />);

  const durationInput = screen.getByRole('spinbutton', {
    name: /enter custom duration/i,
  });
  const minBtn2 = screen.getByRole('button', { name: /2 minutes/i });

  //Typing a positive number sets the duration to that number
  await user.clear(durationInput);
  await user.type(durationInput, '9');
  expect(durationInput).toHaveValue(9);

  // Typing a negative number doesn't change the duration
  user.clear(durationInput);
  await user.type(durationInput, '-9');
  expect(durationInput).toHaveValue(null);

  // Clicking on a duration button sets the duration
  await user.click(minBtn2);
  expect(durationInput).toHaveValue(2);
});

test('User is presented with text to type', async () => {
  render(<Home snippets={snippets} />);

  const input = screen.getByRole('textbox', {
    name: /paste in paragraph/i,
  });
  expect(input).toHaveValue(snippets[0].body);
});

test('pasting in text updates text to type', async () => {
  render(<Home snippets={snippets} />);

  const text = 'Hello, world!';
  const input = screen.getByRole('textbox', {
    name: /paste in paragraph/i,
  });
  input.focus();
  await user.paste(text);
  expect(input).toHaveTextContent(text);
});

test('start game button is enabled only when a duration is selected', async () => {
  render(<Home snippets={snippets} />);
  const startBtn = screen.getByRole('button', { name: /start game/i });
  const durationBtn = screen.getByRole('button', { name: /1 minute/i });
  expect(startBtn).toBeDisabled();

  await user.click(durationBtn);
  expect(startBtn).toBeEnabled();
});

test('clicking start game starts the game', async () => {
  render(<Home snippets={snippets} />);
  const startBtn = screen.getByRole('button', { name: /start game/i });
  const durationBtn = screen.getByRole('button', { name: /1 minute/i });

  await user.click(durationBtn);
  await user.click(startBtn);

  const textToType = screen.getByRole('heading', { name: snippets[0].body });
  expect(textToType).toBeInTheDocument();

  const timer = screen.getByRole('heading', { name: '1:0s' });
  expect(timer).toBeInTheDocument();
});

test('results are displayed when the game finishes', async () => {
  render(<Home snippets={snippets} />);
  const startBtn = screen.getByRole('button', { name: /start game/i });
  const durationBtn = screen.getByRole('button', { name: /1 minute/i });

  await user.click(durationBtn);
  await user.click(startBtn);

  const finishBtn = screen.getByRole('button', { name: /finish/i });
  await user.click(finishBtn);

  const accuracy = screen.getByRole('heading', { name: '0%' });
  expect(accuracy).toBeInTheDocument();

  const speed = screen.getByRole('heading', { name: '0wpm' });
  expect(speed).toBeInTheDocument();
});

test('results are calculated correctly', async () => {
  render(<Home snippets={snippets} />);
  const startBtn = screen.getByRole('button', { name: /start game/i });
  const durationBtn = screen.getByRole('button', { name: /1 minute/i });

  await user.click(durationBtn);
  await user.click(startBtn);

  const finishBtn = screen.getByRole('button', { name: /finish/i });

  const input = screen.getByRole('textbox', {
    name: /start typing/i,
  });

  await user.type(input, snippets[0].body);

  await user.click(finishBtn);

  const accuracy = screen.getByRole('heading', { name: '100%' });
  expect(accuracy).toBeInTheDocument();

  const speed = screen.getByRole('heading', { name: 'Infinitywpm' });
  expect(speed).toBeInTheDocument();
});
