const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// requires in the index in models folder
const models = require("./models");
const path = require('path');

const app = express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
  models.Todo.findAll().then(function(todos) {
    res.render('index', {model: todos});
  });
});

app.post('/', function(req, res) {
  var task = req.body.todo_enter;
  var assignee = req.body.assignee_enter;
  models.Todo.create({
    task: task
    , assignee: assignee
    , completed: false
  }).then(function() {
    res.redirect('/');
  });
});

app.post('/completed/:id', function(req, res) {
  var id = req.params.id;
  models.Todo.update(
    {completed: true}
    , {where: {id: id}}
  ).then(function() {
    res.redirect('/');
  });
});

app.post('/delete/:id', function(req, res) {
  var id = req.params.id;
  models.Todo.destroy({
    where: {id: id}
  }).then(function() {
    res.redirect('/');
  });
});

app.post('/update/:id', function(req, res) {
  var id = req.params.id;
  models.Todo.findOne({
    where: {id: id}
  }).then(function(todo){
    res.render('update', {model: todo});
  });
});

app.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  // var editedTask = req.body.task_edit;
  // var editedAssignee = req.body.assignee_edit;
  models.Todo.findOne({
    where: {id: id}
  }).then(function(todo) {
    todo.task = req.body.task_edit,
    todo.assignee = req.body.assignee_edit;
    todo.save();
  }).then(function(){
    res.redirect('/');
  });
});


app.listen(3000, function() {
  console.log('Successfully started express application!');
});

// ----------CREATING TABLE
// models.Todo.create({
//   task: 'Do homework'
//   , completed: null
// });
