const { defineConfig } = require('cypress');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'drona.db.elephantsql.com',
  user: 'adzrnvll',
  password: 'Yqnt9KVjObtWshfVSivpOTXLS0wgIZxp',
  database: 'adzrnvll',
  port: 5432
})

module.exports = defineConfig({
      viewportWidth: 1440,
      viewportHeight: 900,


  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    on('task',{
      removeUser(email) {
        return new Promise(function(resolve){
          pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result){
            if (error) {
              throw error
            }
            resolve({success: result})
          })
       }
     )}
    })
  }
}
})
