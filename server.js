/*
  OTP SMS Service
*/
const app = require('express')();
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sendMessage = async text => {
  // Initiate the bot to post the message
  const token = process.env.SLACK_BOT_TOKEN;
  let bot = new Slack({ token });

  const [slackError, slackResponse] = await tc(
    bot.chat.postMessage({ channel: '#codes', text })
  );

  // If we get an error back from Slack return an error
  if (slackError) {
    return {
      sent: false,
      message: 'Message failure',
      status: 500
    };
  }

  return {
    sent: true,
    message: 'Message sent',
    status: 200
  };
};
// Blast route
app.post('/receive', async (req, res) => {
  // Get request body data
  const incomingNumber = req.body.From.replace('+', '');
  let message = req.body.Body;

  let slackResponse = await sendMessage(`${incomingNumber}: ${message}`);

  if (slackResponse.sent === false) return res.status(500).send();

  res.status(200).send();
});

const port = process.env.DEV_PORT || 80;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };
