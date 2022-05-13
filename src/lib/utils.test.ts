import { setProperties } from './utils';

describe('Utils', () => {
  it('Sets CSS custom properties', () => {
    setProperties({
      '--foo': 'bar',
      '--bar': 'baz'
    });
    expect(document.documentElement.style.getPropertyValue('--foo')).toBe(
      'bar'
    );
    expect(document.documentElement.style.getPropertyValue('--bar')).toBe(
      'baz'
    );
  });
});
