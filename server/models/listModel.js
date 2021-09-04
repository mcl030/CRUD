const { Pool } = require('pg');

const url = 'postgres://poznqrgk:VTlgAESdiiVJcvdvBh-OsSjQ8gIy4Hk1@kashin.db.elephantsql.com/poznqrgk';
const pool = new Pool({
  connectionString: url
})

module.exports = {
  query: (text, params) =>{
    console.log('Query submitted: ', text, 'with params: ', params) 
    return pool.query(text, params)
  },
}
