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

var todoIdx = 0;
var completedIdx = 0;

var context = {
  todoList: [
    'Feed dog'
    , 'Mow the lawn'
    , 'Do your homework'
  ]
  , todoId: function(){
    return todoIdx++;
  }
  , completed: []
  , completedId: function(){
    return completedIdx++;
  }

};


app.get('/', function(req, res) {
  todoIdx = 0;
  res.render('index', context);
});


app.post('/', function(req, res) {
  var todo = context.todoList;
  todo.push(req.body.todo_enter);
  console.log(todo)
  res.redirect('/');
});


app.post('/todo/:id', function(req, res) {
  console.log('working');
  var id = req.params.id;
  // var completed_item = context.todo[id];
  var todo_removed = context.todoList.splice(id, 1);
  context.completed.push(todo_removed);
  res.redirect('/');
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
