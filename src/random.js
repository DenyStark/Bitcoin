const keccak256 = require('ethereumjs-util').keccak256;

const hashRandom = (bitcoinBlockHash, numbersCount, numbersCountMax) => {
  const randomBuffer = keccak256(bitcoinBlockHash);
  const winNumbers = Buffer.alloc(numbersCount);
  const allNumbers = Buffer.alloc(numbersCountMax, 0);

  for (let i = 0; i < numbersCountMax; i++) {
    allNumbers[i] = i + 1;
  }

  for (let i = 0; i < numbersCount; i++) {
    const n = numbersCountMax - i;

    let winCounter = 0;
    for (let j = 0; j < 4; j++) {
      const value = randomBuffer[i * 4 + j];
      const coef = 2 ** (8 * j);
      winCounter += value * coef;
    }
    const winNumber = winCounter % n;

    winNumbers[i] = allNumbers[winNumber];
    allNumbers[winNumber] = allNumbers[n - 1];
  }

  return winNumbers;
};

module.exports = {
  hashRandom
};
