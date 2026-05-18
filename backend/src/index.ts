import { sum } from '#utils/sum.js';
import express from 'express';
const app = express();
const port = process.env.PORT ?? '3000';

app.get('/', (req, res) => {
    res.send(`Hello World! Sum of 2 and 5 is ${sum(2, 5).toString()}`);
    console.log('Response sent');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
