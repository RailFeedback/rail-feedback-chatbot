import { Operator, Trip, Word } from '../models';

const now = new Date();

const hoursDeltaDate = (hours) => new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours()+hours
)

const main = async () => {

  const gwr = new Operator({
    name: 'GWR'
  });

  await gwr.save();

  const london_swindon = new Trip({
    operator: gwr,
    start_station: 'PAD',
    end_station: 'SWN',
    start_time: hoursDeltaDate(1),
    end_time: hoursDeltaDate(2)
  });

  await london_swindon.save();

  let words = require('./words.json');
  words = words.map((word,index) => new Word({
    operator: gwr,
    trip: london_swindon,
    rank: words.length - index,
    word: word
  }));

  await Promise.all(words.map((word) => word.save()));

  return { gwr, london_swindon };

}

export default main;
