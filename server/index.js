const express = require('express');
const bodyParser = require('body-parser');
const DB = require('./db');

const app = express();
const port = 5000;

// 解析json数据
app.use(bodyParser.json());

// 解析form表单数据 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await DB.find('user', { 'name': userName, 'pwd': password });
  res.json({
    code: 20000,
    status: user.length > 0 ? 'ok' : 'err:用户或者密码错误',
  })
});

app.listen(port, () => {
  console.log('listening server on port', `${port}`);
});