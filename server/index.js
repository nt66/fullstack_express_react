const express = require('express');
// const session = require('express-session');
const app = express();
const port = 5000;

app.get('/login',(req,res)=>{
  res.json({
    code: 20000,
    data:'ok',
  })
});

app.listen(port,()=>{
  console.log('listening server on port', `${port}`);
})