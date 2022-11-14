const pool = require('pg').Pool;
require("dotenv").config();
const dbconn = new pool({
    user: process.env.DB_USER,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
    ssl: {
        rejectUnauthorized: false
    }
  });

module.exports = dbconn;


//   pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
//   })
//   const client = new Client(credentials);
//   client.connect()
//   client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
//   })

//   async function registerPerson(person) {
//     const text = `
//       INSERT INTO users (user_id, user_name)
//       VALUES ($1, $2, $3, $4)
//       RETURNING id
//     `;
//     const values = [person.fullname, person.gender, person.phone, person.age];
//     return pool.query(text, values);
//   }
