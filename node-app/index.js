const express =require('express');
const app = express();
require('dotenv').config();
const port = 8000;
const name = process.env.NAME;

app.get('/', (req,res) => {
res.send('Hello Node JS');
});

app.get('/name', (req,res) => {
res.send(`Hello ${name}`);
});

app.listen(port, () => {
console.log(`Server is running at http://localhost:${port}`);
});
