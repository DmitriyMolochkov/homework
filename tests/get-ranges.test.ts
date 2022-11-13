import getRanges from '../src/get-ranges';

test('check getRanges', () => {
  expect(getRanges([0, 1, 2, 3, 4, 7, 8, 10])).toBe('0-4,7-8,10');
  expect(getRanges([4, 7, 10])).toBe('4,7,10');
  expect(getRanges([2, 3, 8, 9])).toBe('2-3,8-9');
  expect(getRanges([2, 3, 3, 1, 2])).toBe('2-3,3,1-2');
  expect(getRanges([])).toBe('');
});
