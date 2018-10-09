const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const Promise = require('bluebird');
const readFilePromise = Promise.promisify(fs.readFile);

//var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.writeFile(exports.dataDir + '/' + id + '.txt', text, () => {
      callback(null, { id, text});
    });
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if(err) {
      callback(err);
    } else {
      var data = _.map(files, (file) => {
        var fileId = path.basename(file, '.txt');
        var filepath = path.join(exports.dataDir, file);
        return readFilePromise(filepath).then((fileData) => {
          return {
              id: fileId, text: fileData.toString()
          }
        })
      })
      Promise.all(data).then((items) => {
        callback(null, items)
      }, err => callback(err));
    }
  });
};

  // fs.readdir(exports.dataDir, (err, files) => {
  //   var data = [];
  //   for(var i = 0; i<files.length; i++) {
  //     var strArr = files[i].split('.');
  //     var str = strArr[0];
      
  //     data.push({id: str, text: str});
  //   }
  //   callback(null, data);
  // });
exports.readOne = (id, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, data) => {
    if(err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text: data});
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, (err, data) => {
    if(err) {
      callback(new Error(`No item with id: ${id}`))
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err, data) => {
        callback(null, {id, text: data});
      })
    }
  })
};

exports.delete = (id, callback) => {
  fs.unlink(`${exports.dataDir}/${id}.txt`, (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback();
    }
  })
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
