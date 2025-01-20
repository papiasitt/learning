const express = require ('express');
const app = express('app');
const PORT = 3000;

/*
// app.get('/',(req,res) =>{
//     res.send("Welcome to express.js");
// } );

app.get('/hello',(req,res)=>{
    res.set("Content-Type","text/html");
    res.status(200).send("<h1>Welcome to NODE JS</h>")
})*/

app.use(express.json());
app.post('/',(req,res)=>{
    const {name} = req.body;
    console.log("Name"+ req.body.name);
    res.send(`Welcome ${name}`);
})

app.listen(PORT,(error)=> {
    if(!error)
    console.log("Server is Successfully Running, and App is listening on port "+ PORT);
else 
    console.log("Error occurred, server can't start", error);
})
