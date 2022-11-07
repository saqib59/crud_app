const {Pool, Client} = require('pg');

// const pool = new Pool({
//     user: "niuksbuokhokem",
//     host: "ec2-44-205-177-160.compute-1.amazonaws.com",
//     database: "de8ttt3jrv7o65",
//     password: "65e797b06cc4f90dc2831cdd95145e720de8b6e639ed9b0f7c5ed2bf70122268",
//     port: "5432",
// });

const credentials = {
    user: "niuksbuokhokem",
    host: "ec2-44-205-177-160.compute-1.amazonaws.com",
    database: "de8ttt3jrv7o65",
    password: "65e797b06cc4f90dc2831cdd95145e720de8b6e639ed9b0f7c5ed2bf70122268",
    port: "5432",
  };


// Connect with a connection pool.

async function poolDemo() {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT NOW()");
    await pool.end();
  
    return now;
  }
  
  // Connect with a client.
  
  async function clientDemo() {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query("SELECT NOW()");
    await client.end();
  
    return now;
  }
  
  // Use a self-calling function so we can use async / await.
  
  (async () => {
    const poolResult = await poolDemo();
    console.log("Time with pool: " + poolResult.rows[0]["now"]);
  
    const clientResult = await clientDemo();
    console.log("Time with client: " + clientResult.rows[0]["now"]);
  })();


var query = client.query("SELECT * FROM users");


module.exports = pool;