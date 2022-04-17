const fs = require('fs');
const util = require('util');

// FUNCTIONS
// Reads the file, but as a promise.
const fileRead = util.promisify(fs.readFile);
// JS DOC
/**
 *  Writes data to JSON
 *  @param {string} destination file to write to
 *  @param {object} content content to write
 *  @returns {void} nothing
 */

const fileWrite = (location, content) =>
  fs.writeFile(location, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`content saved to ${location}`)
  );
  // JS DOC
/**
 *  Reads data and appends content
 *  @param {object} content content to save
 *  @param {string} file file path
 *  @returns {void} nothing
 */

const readThenAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      fileWrite(file, parsedData);
    }
  });
};


module.exports = { fileRead, fileWrite, readThenAppend};