const express = require("express");
// const pool = require("pg");
const conn = require("./dbconn");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json())

app.get("/user",(req, res) => {

    conn.query("Select * from public.users", (error,result)=>{
        if(error){
            throw error
        }

        res.status(200).json(result.rows);
    })
})


app.post("/createuser", async (req, res) => {
    let result = await conn.query(`INSERT INTO public.users (user_id, user_name) VALUES ($1, $2)` 
    ,[req.body.user_id, req.body.user_name] );
    console.log(result);
    res.json({"status":"user created"});
})
app.put("/updateuser", async (req, res) => {
    let result = await conn.query(`UPDATE public.users SET "user_name" = $1 WHERE "user_id" = $2` 
    ,[req.body.user_name, req.body.user_id] );
    console.log(result);
    res.json({"status":"user updated"});

})

app.listen(port, ()=>{
    console.log(port);
})