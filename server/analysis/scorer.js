import { Word } from '../models';

class Scorer {
  constructor(operator, trip){
    this.operator = operator;
    this.trip = trip;
  }
  score(word){
    return (word.rank)*(word.conversions/word.impressions);
  }
  // Includes sorting and limit
  word_finder(){
    return Word.find({ operator: this.operator, trip: this.trip }).sort({ rank: 1 }).exec();
  }
  random_number(){
    return Math.random();
  }
  // Get top three words for an operator trip
  async words_getter(count=3){
    // Access words for the trip
    let words = await this.word_finder();
    // Sort all the words by their score
    words = words.sort((a,b) => this.score(b) - this.score(a));
    console.log(words);
    // Create a collection of buckets for storing
    let buckets = words.reduce((buckets,word,index) => {
      buckets[index] = this.score(word) + (buckets[index-1] || 0);
      return buckets;
    },[]);
    console.log(words.length,buckets.length);
    // Collect samples using probability
    let sample = [];
    const maximum = buckets[buckets.length-1];
    while (sample.length < 3){
      let selection;
      let random_number = maximum*this.random_number();
      for (let i=1; i<buckets.length-1; i++){
        if (random_number > buckets[i-1]){
          selection = words[i];
        }
      }
      if (selection && !sample.includes(selection)){
        sample.push(selection);
      }
    }
    console.log(sample);
    // Increment the impressions of the selected words
    await Promise.all(sample.map((word) => {
      word.impressions += 1;
      return word.save();
    }));
    // Return a list of word strings
    return sample.map((word) => word.word);
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
