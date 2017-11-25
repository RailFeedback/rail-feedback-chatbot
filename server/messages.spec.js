import handleMessage from './messages';

test('should return toilet as object in present first noun response', () => {
  const result = handleMessage("toilet",() => 0);
  expect(result).to.equal("What is wrong with the toilet?");
});

test('should return toilet as object in present second noun response', () => {
  const result = handleMessage("toilet",() => 1);
  expect(result).to.equal("What is up with the toilet?");
});
