const { Pool } = require('pg');

const url = 'postgres://bqqdneki:b9Gdl_cTf8dPgftZNsQJ3nw2SCJKqAX7@kashin.db.elephantsql.com/bqqdneki';
const pool = new Pool({
  connectionString: url
})

module.exports = {
  query: (text, params) =>{
    console.log('Query submitted: ', text, 'with params: ', params) 
    return pool.query(text, params)
  },
}
