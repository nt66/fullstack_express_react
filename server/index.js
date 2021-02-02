const express = require('express');
// const session = require('express-session');
const app = express();
const port = 5000;

app.get('/',(req,res)=>{
  res.send('hello fullstack!!');
})

app.listen(port,()=>{
  console.log('listening server on port', `${port}`);
})