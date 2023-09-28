/* eslint-env node */
import sgMail from '@sendgrid/mail';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { to, from, subject, text } = JSON.parse(event.body);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from,
    subject,
    html: text,
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
}
