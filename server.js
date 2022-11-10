// eslint-disable-next-line import/no-extraneous-dependencies
// @ts-nocheck
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./dist'));

app.get('*', (_req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
