/* eslint-env node */
const sgMail = require('@sendgrid/mail');

exports.handler = async function (event, context) {
  console.log(`Context: ${context}`);

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { to, subject, text } = JSON.parse(event.body);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: 'jawad.php@gmail.com',
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: 'Email sent successfully!',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: 'Error sending email',
    };
  }
};
