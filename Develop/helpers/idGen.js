// Creates an ID by generating a random string of letters and numbers.

const idgen = () => {
  Math.floor(Math.random() * 0x1000)
    .toString(8)
    .substring(1);
};

module.exports = idgen;
