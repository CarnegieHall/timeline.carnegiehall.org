import { render } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('Renders button elements', () => {
    const { getByText } = render(<Button>button</Button>);
    expect(getByText('button').tagName).toBe('BUTTON');
  });
  it('Renders an anchor if href is present', () => {
    const { getByText } = render(<Button href="/about">button</Button>);
    expect(getByText('button').tagName).toBe('A');
  });
});
