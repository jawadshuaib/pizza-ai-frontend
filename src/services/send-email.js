// This calls the node file in netlify/functions/send-email.js
export default async function sendEmail({ to, subject, orderId }) {
  // try {
  const response = await fetch('/.netlify/functions/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      useCors: false,
      from: 'jawad.php@gmail.com',
      to,
      subject,
      orderId,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok' + response.statusText);
  }
  //   return response;
  // } catch (error) {
  //   console.error('There has been a problem with your fetch operation:', error);
  // }

  // try {
  //   const response = await fetch('/.netlify/functions/send-email', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       to,
  //       subject,
  //       text,
  //     }),
  //   });

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok' + response.statusText);
  //   }

  //   return response;
  // } catch (error) {
  //   return { error: error.message };
  // }
}
