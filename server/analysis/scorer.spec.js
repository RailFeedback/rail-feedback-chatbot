import Scorer from './scorer';

let scorer;

beforeEach(() => scorer = new Scorer());

test('should return ', async () => {
  let i = 0;
  let length = 10;
  scorer.random_number = () => {
    i += 0.1;
    return i;
  }
  scorer.word_finder = () => Array(length).fill().map((_,i) => ({
    word: `word${i}`,
    rank: length-i,
    impressions: 1,
    conversions: 1,
    save: async () => _
  }));
  let words = await scorer.words_getter();
  expect(words).to.deep.equal(['word1','word2','word3'])

})
