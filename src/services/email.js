import { info } from '../utils/settings';

// This calls the node file in netlify/functions/send-email.js
export async function email({ to, from, subject, text }) {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        from,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response;
  } catch (error) {
    return { error: error.message };
  }
}

export const prepareEmail = ({ orderId, pizzaName, imageUrl }) => {
  const orderUrl = info.url + 'order/status/' + orderId;
  const text = `
  <a href='${orderUrl}'><img src='${imageUrl}' /></a>`;
  const subject =
    pizzaName !== '' ? 'Pizza Order for ' + pizzaName : 'Pizza order complete';

  return {
    from: info.email,
    text,
    subject,
  };
};

export default email;
