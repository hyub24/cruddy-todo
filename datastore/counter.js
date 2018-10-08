const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

//Do this by rewriting getNextUniqueId to make use of the provided readCounter and writeCounter functions.

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// it('should use error first callback pattern', (done) => {
//   counter.getNextUniqueId((err, id) => {
//     expect(err).to.be.null;
//     expect(id).to.exist;
//     done();
//   });
// });
// Public API - Fix this function //////////////////////////////////////////////
  // counter.getNextUniqueId((err, id) => {
  //   expect(err).to.be.null;
  //   expect(id).to.exist;
  //   done();
  // });
exports.getNextUniqueId = (err, id) => {
  if (err) {
    throw('error getting next unique id');
  } else {
    return zeroPaddedNumber(counter);
  }
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
