var express = require('express');
var router = express.Router();
var promise = require('bluebird');

//Postgres
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require("pg-promise")(options);
var db = pgp("postgres://postgres:postgres@localhost:5432/todos");


//Get todos
router.get('/', function(req, res, next) {
  db.any('SELECT * FROM todo ORDER BY id ASC')
    .then(function(data){
        res.status(200)
        .json({
            todos: data
        });
    })
    .catch(function(err){
      return next(err);
    });
});


//Add todo
router.post('/add', function(req, res, next) {
  db.result('INSERT INTO todo (text)' + 'VALUES(${text}) RETURNING id', req.body.todos)
    .then(function(data){
      res.status(200).json({
        ok: true,
        idTodo: data.rows[0].id
      });
    })
    .catch(function(err){
      return next(err);
    });
});

//Delete todo
router.get('/del/:id', function(req, res, next) {
  db.result('DELETE FROM todo where id = $1', req.params.id)
    .then(function(result){
      res.status(200)
      .json({ok: true});
    })
    .catch(function(err){
      return next(err);
    });
});

module.exports = router;
