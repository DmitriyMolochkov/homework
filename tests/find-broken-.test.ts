import findBrokenTag from '../src/find-broken-tag';

describe('check findBrokenTag', () => {
  test('It should return "true"',  () => {
    expect(findBrokenTag('<div><span></span></div>')).toBe(true);
    expect(findBrokenTag('<div><span>some data</span></div>')).toBe(true);
    expect(findBrokenTag('')).toBe(true);
  });

  test('It should return "span"',  () => {
    expect(findBrokenTag('<div><span></Span></div>')).toBe('span');
    expect(findBrokenTag('<div><span>')).toBe('span');
  });

  test('It should return "div"',  () => {
    expect(findBrokenTag('<span></span><div>')).toBe('div');
    expect(findBrokenTag('<span></span></div>')).toBe('div');
  });
})