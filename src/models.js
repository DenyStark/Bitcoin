class Block {
  constructor(apiBlock) {
    this.hash = apiBlock.hash;
    this.height = apiBlock.height;
    this.time = apiBlock.time;
  }
}

module.exports = {
  Block
};
