const express = require('express')
const app = express();
const path = require('path');
const db = require('./models/listModel.js');

const PORT = 3000;

//unsolved 
//Uncaught SyntaxError: Unexpected token '<'  error thrown for index.js 
// app.use('/', (req, res)=> {
//   res.sendFile(path.join(__dirname, '../client/index.html'))
// })

app.use(express.static('client'));

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


//https://stackoverflow.com/questions/41078393/express-send-file-error-404-not-found
///404 index.js not found
// app.get('/', (req, res)=> {
//   res.sendFile(path.join(__dirname, '../client/index.html'))
// })

app.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)})