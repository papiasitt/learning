const express = require ('express');
const app = express('app');
const router= express.Router();
const PORT = 3001 ;

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
    console.log("Name"+ req.body.name);
    const {name:name2} = req.body;    
    res.send(`Welcome ${name2}`);
})

app.listen(PORT,(error)=> {
    if(!error)
    console.log("Server is Successfully Running, and App is listening on port "+ PORT);
else 
    console.log("Error occurred, server can't start", error);
})
