const { Pool } = require('pg');
///https://node-postgres.com/features/connecting
///https://stackoverflow.com/questions/65451703/when-to-use-node-postgres-package-pool-vs-client
//difference between pooling and client 
//https://stackoverflow.com/questions/60974049/how-i-can-do-a-module-exports-for-a-pool-of-postgres

const url = 'postgres://bqqdneki:b9Gdl_cTf8dPgftZNsQJ3nw2SCJKqAX7@kashin.db.elephantsql.com/bqqdneki';
const pool = new Pool({
  connectionString: url
})



// module.exports = {
//   query: (text, params) =>{
//     console.log('this was queried with', text, 'and the params', params) 
//     return pool.query(text, params)
//   },
// }


// module.exports = pool.query
//module.exports = pool;

// pool.query("SELECT * FROM blah").then

// const dbQuery = require('/listModel.js')

// dbQuery()