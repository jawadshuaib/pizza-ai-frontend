/* eslint-env node */
import sgMail from '@sendgrid/mail';
import fetch from 'node-fetch';
// const { corsProxy } = require('../../src/utils/settings');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { from, to, subject, orderId } = JSON.parse(event.body);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Fetch the contents of the page
  let pageContent;
  // Create cors link
  // const corsProxyUrl = useCors
  //   ? `${corsProxy.local}?contentType=application/json&url=`
  //   : '';
  // const corsProxyUrl = useCors ? `https://cors-anywhere.herokuapp.com/` : '';

  try {
    const response = await fetch(
      `http://localhost:8888/order/status/${orderId}`,
    );
    pageContent = await response.text();
  } catch (error) {
    return {
      statusCode: 400,
      body: 'Error fetching page content',
    };
  }

  console.log(pageContent);
  // Prepare the email with the fetched page content as the body
  const msg = {
    to,
    from,
    subject,
    html: pageContent, // Send the HTML content as the email body
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
