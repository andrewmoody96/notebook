// Creates an ID by generating a random string of letters and numbers.

module.exports = () => 
  Math.floor((1 + Math.random()) * 0x1000)
    .toString(16)
    .substring(1);
