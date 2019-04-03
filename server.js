require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sendMail } = require('./controllers/mail_controller');

const app = express();
const port = process.env.PORT || 1234;

app.use(bodyParser.json())

app.post('/mail', sendMail);

app.listen(port, () => {
  console.log(`
    Server started on port: ${port},
    With process id: ${process.pid}
  `)
});