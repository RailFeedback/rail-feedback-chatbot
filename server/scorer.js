import { Word } from './models';

const score = (word) => (word.rank)*(word.conversions/word.impressions);

class Scorer {
  constructor(operator, trip){
    this.operator = operator;
    this.trip = trip;
  }
  // Get top three words for an operator trip
  async words_getter(){
    // Access words for the trip
    let words = await Word.find({ operator: this.operator, trip: this.trip }).exec();
    // Sort words by their score and select top three
    // TODO make this random select not just top scoring
    words = words.sort((a,b) => score(b) - score(a)).slice(0,3);
    // Increment the impressions of the selected words
    await Promise.all(words.map((word) => {
      word.inpressions += 1;
      return word.save();
    }));
    // Return a list of word strings
    return words.map((word) => word.word);
  }
  // Convert a word when selected
  async word_conversion(word){
    word = await Word.findOne({
      operator: this.operator,
      trip: this.trip,
      word: word
    });
    word.conversions += 1;
    return word;
  }
}

export default Scorer;
