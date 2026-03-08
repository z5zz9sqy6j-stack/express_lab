const express = require('express');
const app = express();
app.get('/',(req, res)=>{
console.log('Here');
res.render('index');
});
app.get('/status',(req, res)=>{
res.download('server.js');
});
app.listen(3030);
