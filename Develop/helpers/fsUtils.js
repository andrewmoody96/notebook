const fs = require("fs");
const util = require("util");

// FUNCTIONS
const fileRead = util.promisify(fs.readFile);

const writeToFile = (location, content) =>
  fs.writeFile(location, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`content saved to ${location}`)
  );

  