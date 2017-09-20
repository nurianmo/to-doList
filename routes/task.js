var express = require('express');
var router = express.Router();

//Example
var tasks = {
  todos: [
    {
      id: 0,
      text: "AAA"
    },
    {
      id: 1,
      text: "BBB"
    }
],
nextId: 2
};

//Get todos
router.get('/', function(req, res, next) {
  res.send(tasks);
  res.end();
});

//Add todo
router.post('/add', function(req, res, next) {
  tasks.todos.push(req.body.todos);
  tasks.nextId = req.body.nextId;
  res.end();
});

//Delete todo
router.get('/del/:id', function(req, res, next) {

  tasks.todos = tasks.todos.filter(function(item){
    return item.id != req.params.id;
  });
  res.end();
});

module.exports = router;
