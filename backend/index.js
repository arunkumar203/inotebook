const connectToMongoDB = require('./db');
const express = require('express');
const cors=require('cors');
connectToMongoDB().catch(console.log("not connected"));

const app=express();
app.use(express.json());
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(5000,()=>{
    console.log('Server started and listening on 3000 port');
})



 