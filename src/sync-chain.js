const explorer = require('blockchain.info/blockexplorer');
const Block = require('./models').Block;
const db = require('./database');

// 2009 - 1230768000000
// 2010 - 1262304000000
// 2011 - 1293840000000
// 2012 - 1325376000000
// 2013 - 1356998400000
// 2014 - 1388534400000
// 2015 - 1420070400000
// 2016 - 1451606400000
// 2017 - 1483228800000
// 2018 - 1514764800000

const START = 1514764800000;
const STOP = 2514764800000;
const DAY = 86400000;

const blocks = [];


const syncBlocks = (time, stop) => {
  if (time >= stop || time >= Date.now()) {
    console.log(`Total ${blocks.length} blocks`);
    db.insertBlocks(blocks);
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
