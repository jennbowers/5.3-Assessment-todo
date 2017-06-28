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

  models.Todo.create({
    task: task
    , completed: false
  });
  res.redirect('/');
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


app.listen(3000, function() {
  console.log('Successfully started express application!');
});

// ----------CREATING TABLE
// models.Todo.create({
//   task: 'Do homework'
//   , completed: null
// });
