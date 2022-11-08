// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./dist'));

app.get('*', (_req: Request, res: Response) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
