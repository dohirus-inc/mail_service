const fetch = require('node-fetch');

const sendgridApi = 'https://api.sendgrid.com/v3/mail/send';
const authorization = `Bearer ${process.env.SENDGRID_API_KEY}`;

const dohirusEmail = 'hellodohirus@gmail.com';
const dohirusName = 'Hello Dohirus';

exports.sendMail = (req, res) => {
  const { name, email, subject, msg } = req.body;

  if (!name || !email || !subject || !msg){
    return res.sendStatus(400);
  }

  const mailInfo = {
    personalizations: [{
      to: [{
        email: dohirusEmail,
        name: dohirusName
      }],
      subject
    }],
    content: [{
      type: 'text/plain',
      value: msg
    }],
    from: {
      email,
      name
    }
  };

  fetch(sendgridApi, {
    method: 'post',
    body: JSON.stringify(mailInfo),
    headers: {
      authorization,
      'content-type': 'application/json'
    }
  }).then(() => {
    console.log(`
      New Email sent from ${email}, <${name}>,
      subject: ${subject},
      msg: ${msg}
    `);
    res.sendStatus(200);
  }).catch((a) => {
    res.sendStatus(500)
  });
};