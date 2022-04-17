// Creates an ID by generating a random string of letters and numbers.

const idGen = () => {
  Math.floor(Math.random() * 0x1000)
    .toString(5)
    .substring(1);
};

module.exports = idGen;
