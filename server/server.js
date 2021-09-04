const express = require('express')
const app = express();
const path = require('path');
const db = require('./models/listModel.js');

const PORT = 3000;
app.use(express.json())
//unsolved 
//Uncaught SyntaxError: Unexpected token '<'  error thrown for index.js 
// app.use('/', (req, res)=> {
//   res.sendFile(path.join(__dirname, '../client/index.html'))
// })

app.use(express.static('client'));

app.post('/addTodo', (req, res)=>{
  console.log('LINE 17 SERVER hello')
  const parent = req.body.parent; // string
  const params = [parent];
  query = `INSERT INTO todo(name) VALUES($1) RETURNING _id`;

  db.query(query, params)
    .then( data => {
      console.log(data)
      res.locals.id = data.rows[0]._id; // idk but we need to send back the id
      res.status(200).json(res.locals.id);
    })
    .catch(err=> console.log('uhoh', err))
})


app.post('/addTask', (req, res) => {
  const task = req.body.task;
  const parent = req.body.parent; // this needs to be an id
  const params = [task, false, parent];
  query = `INSERT INTO task(name, status, parent)
    VALUES($1, $2, $3) RETURNING _id`;

  db.query(query, params)
    .then(data => {
      console.log(data)
      res.locals._id = data.rows[0]._id;
      res.status(200).json(res.locals);
    })
    .catch( err => {
      console.log(err)
    })
})


app.get('/getTasks/:parent', (req, res) => {
  const parent = req.params.parent;
  const query = `SELECT * FROM task WHERE parent = ${parent}`

  db.query(query)
    .then(data => {
      res.locals = data.rows;
      res.send(JSON.stringify(res.locals));
    })
    .catch( err => {
      res.send(err)
    })
  
})

app.get('/getTodos', (req, res) => {
  const query = `SELECT * FROM todo`

  db.query(query)
    .then( data => {
      console.log('getTodo route data: ', data.rows)
      res.locals = data.rows;
      res.send(JSON.stringify(res.locals));
    })
    .catch(err => console.log(err))
})

app.put('/toggleTask', (req, res) => {
  const task_id = req.body.task_id;
  const status = req.body.status;

  const query = `UPDATE task 
    SET status = ${status} 
    WHERE _id = ${task_id}`

  db.query(query)
    .then( data => {
      console.log('toggleTask route data: ')
      res.set(200);
      res.send(JSON.stringify('derp'));
    })
    .catch(err => console.log(err))
})


//https://stackoverflow.com/questions/41078393/express-send-file-error-404-not-found
///404 index.js not found
// app.get('/', (req, res)=> {
//   res.sendFile(path.join(__dirname, '../client/index.html'))
// })

app.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)})