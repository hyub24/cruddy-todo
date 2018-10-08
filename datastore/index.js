const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  var id = counter.getNextUniqueId();
  items[id] = text;
  callback(null, { id, text });
};


// describe('readAll', () => {
//   it('should return an empty array when there are no todos', (done) => {
//     todos.readAll((err, todoList) => {
//       expect(err).to.be.null;
//       expect(todoList.length).to.equal(0);
//       done();
//     });
//   });
//8) should return an empty array when there are no todos
//9) should return an array with all saved todos
exports.readAll = (callback) => {
  var data = [];
  _.each(items, (text, id) => {
    data.push({ id, text });
  });
  console.log('LENGTH OF DATA: ' + data.length);
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

// todos.update(todoId, updatedTodoText, (err, todo) => {
//   const todoFileContents = fs.readFileSync(path.join(todos.dataDir, `${todoId}.txt`)).toString();
//   expect(todoFileContents).to.equal(updatedTodoText);
//   done();
// });

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
