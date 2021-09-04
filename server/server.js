// Grab imports
const express = require('express')
const path = require('path');
const db = require('./models/listModel.js');

// Declare server name and invoke server creation
const app = express();
const PORT = 3000;

// Use express.json() to parse request body into JSON
app.use(express.json())

// Use express.static() to server static files
app.use(express.static('client'));

// GET routes for tasks and todos
app.get('/getTasks/:parent', (req, res) => {
  const parent = req.params.parent; // parent id
  const query = `SELECT * FROM task WHERE parent = ${parent}`
  db.query(query)
    .then(data => {
      res.locals = data.rows;
      res.send(JSON.stringify(res.locals));
    })
    .catch(err => {
      res.send(err);
    })
})

app.get('/getTodos', (req, res) => {
  const query = `SELECT * FROM todo`
  db.query(query)
    .then( data => {
      res.locals = data.rows;
      res.send(JSON.stringify(res.locals));
    })
    .catch(err => {
      res.send(err);
    })
})

// POST routes for adding tasks and todos
app.post('/addTask', (req, res) => {
  const task = req.body.task; // task name
  const parent = req.body.parent; // parent id
  const params = [task, false, parent];
  query = `INSERT INTO task(name, status, parent)
    VALUES($1, $2, $3) RETURNING _id`;
  db.query(query, params)
    .then(data => {
      res.locals._id = data.rows[0]._id;
      res.status(200).json(res.locals);
    })
    .catch(err => {
      res.send(err);
    })
})

app.post('/addTodo', (req, res)=>{
  console.log('LINE 17 SERVER hello')
  const parent = req.body.parent; // parent name
  const params = [parent];
  query = `INSERT INTO todo(name) VALUES($1) RETURNING _id`;
  db.query(query, params)
    .then( data => {

      res.locals.id = data.rows[0]._id;
      res.status(200).json(res.locals.id);
    })
    .catch(err => {
      res.send(err);
    })
})

// PUT route to edit task status
app.put('/toggleTask', (req, res) => {
  const task_id = req.body.task_id;
  const status = req.body.status;
  const query = `UPDATE task 
    SET status = ${status} 
    WHERE _id = ${task_id}`
  db.query(query)
    .then(data => {
      res.set(200);
      res.end();
    })
    .catch(err => console.log(err))
})

// Configure server to listen to PORT 3000
app.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)})