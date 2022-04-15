const fs = require("fs");
const util = require("util");

// FUNCTIONS
// Reads the file, but as a promise.
const fileRead = util.promisify(fs.readFile);

const writeToFile = (location, content) =>
  fs.writeFile(location, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`content saved to ${location}`)
  );

const readThenAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};


module.exports = { fileRead, writeToFile, readThenAppend};