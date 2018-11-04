const random = require('./random');
const db = require('./database');

const NUMBER_COUNT = 6;
const NUMBER_MAX_COUNT = 49;

const numbers = new Array(NUMBER_MAX_COUNT).fill(0);
const processHashRandom = result => {
  result.forEach(number => {
    numbers[number - 1] += 1;
  });
};

const start = async() => {
  const blocks = await db.selectHashes({ minHeight: 0, maxHeight: 10000000 });

  const timer = new Date();
  blocks.forEach(block => {
    const result =
      random.hashRandom(block.hash, NUMBER_COUNT, NUMBER_MAX_COUNT);
    processHashRandom(result);
  });

  numbers.forEach(number => {
    console.log(number);
  });

  console.log(new Date() - timer + 'ms');
};
start();
