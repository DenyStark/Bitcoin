const explorer = require('blockchain.info/blockexplorer');
const Block = require('./models').Block;

// 2009 - 1230768000000
// 2010 - 1262304000000

const START = 1230768000000;
const STOP = 1262304000000;
const DAY = 86400000;

const blocks = [];


const syncBlocks = (time, stop) => {
  if (time >= stop || time >= Date.now()) {
    console.log(`Total ${blocks.length} blocks`);
    return;
  }

  explorer.getBlocks(time).then(result => {
    const newBlocks = result.blocks;
    newBlocks.forEach(block => {
      blocks.push(new Block(block));
    });

    console.log(`${new Date(time)}\t Add ${newBlocks.length} blocks`);

    syncBlocks(time + DAY, stop);
  }).catch(error => {
    console.log(error.message);
    syncBlocks(time, stop);
  });
};

syncBlocks(START, STOP);
