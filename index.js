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

app.delete("/deleteuser", async (req, res) => {
    let result = await conn.query(`DELETE FROM public.users WHERE "user_id" = $1` 
    ,[req.body.user_id] );
    console.log(result);
    res.json({"status":result});

})

// CREATE TASK

app.post("/createtask", async (req, res) => {
    let result = await conn.query(`INSERT INTO public.todolist (task, status) VALUES ($1, $2)` 
    ,[req.body.task, req.body.status] );
    console.log(result);
    res.json({"status":"task created"});
})

// GET TASKS
app.get("/tasks_done", async (req, res) => {
    if(req.body.status){
        let result = await conn.query(`Select * from public.todolist WHERE status = $1` 
        ,[req.body.status] );
        console.log(result.rows);
        res.json({"done_tasks ":result.rows});
    }
    if(req.body.status_count){
        let result = await conn.query(`Select COUNT(*) from public.todolist WHERE status = $1` 
        ,[req.body.status_count] );
        console.log(result.rows);
        res.json({"done_tasks ":result.rows});
    }


   
})

    // TOTAL TASKS
app.get("/total_tasks", async (req, res) => {
        let result = await conn.query(`Select 
        COUNT(*) as total, 
        COUNT(*) filter (where status = 'pending') as pending,
        COUNT(*) filter (where status = 'done') as done
        from public.todolist`);
        console.log(result);
        res.json(result.rows);
    })
       

app.listen(port, ()=>{
    console.log(port);
})