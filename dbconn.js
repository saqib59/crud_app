const {Pool, Client} = require('pg');

const credentials = {
    user: "niuksbuokhokem",
    host: "ec2-44-205-177-160.compute-1.amazonaws.com",
    database: "de8ttt3jrv7o65",
    password: "65e797b06cc4f90dc2831cdd95145e720de8b6e639ed9b0f7c5ed2bf70122268",
    port: "5432",
    ssl: {
        rejectUnauthorized: false
    }
  };

const pool = new Pool(credentials);

  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
  const client = new Client(credentials);
  client.connect()
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
  })

  async function registerPerson(person) {
    const text = `
      INSERT INTO users (user_id, user_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [person.fullname, person.gender, person.phone, person.age];
    return pool.query(text, values);
  }

module.exports = pool;