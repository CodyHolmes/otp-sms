# otp-sms

A simple OTP SMS to Slack app

## Environment Variables

- `SLACK_BOT_TOKEN` - Twilio Account SID
- `DEV_PORT`
- `NODE_ENV`

## Usage

1. Deploy this service
2. Change Twilio text hook to point to your service

## Local Testing / Deploying

- Use serveo.net to expose local ports to the world
  - Blast: `ssh -R otp-sms:80:localhost:3001 serveo.net`
- Use Google Cloud CLI to push services to functions
  - First deploy: `gcloud functions deploy <name> --runtime nodejs10 --trigger-http --entry-point <function>`
  - Subsequent deploys: `gcloud functions deploy <name> --trigger-http --en
