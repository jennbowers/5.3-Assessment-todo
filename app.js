const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const context = {
  todoList: [
    {task: 'Feed dog'
    , done: ''}
    , {task: 'Mow the lawn'
    , done: ''}
    , {task: 'Do your homework'
    , done: ''}
]
};

var todo = context.todoList;

app.get('/', function(req, res) {
  res.render('index', context);
});


app.post('/', function(req, res) {
  todo.push({task: req.body.todo_enter, done: ''});
  console.log(todo)
  res.render('index', context);
});


// example given in assignment
// const todos = [
//   "Wash the car"
// ];
//
// app.get("/", function (req, res) {
//   res.render('index', { todos: todos });
// });
//
// app.post("/", function (req, res) {
//   todos.push(req.body.todo);
//   res.redirect('/');
// })



app.listen(3000, function() {
  console.log('Successfully started express application!');
});
