import { render } from '@testing-library/react';

import Home1 from './home';

describe('Home1', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home1 />);
    expect(baseElement).toBeTruthy();
  });
});
