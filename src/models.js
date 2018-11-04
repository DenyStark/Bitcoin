class Block {
  constructor(apiBlock) {
    this.hash = apiBlock.hash;
    this.height = apiBlock.height;
  }
}

module.exports = {
  Block
};
