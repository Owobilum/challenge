import { render } from '../test-utils';
import Home from '../pages/index';

describe('Home', () => {
  it('renders the homepage', () => {
    render(<Home />);
  });
});
