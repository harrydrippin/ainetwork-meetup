# AINetwork Meetup Service

## Configuration: `.env`

This project needs `.env` file for the test and deploy. Example file format is below:
```bash
# Fundamentals
SERVER_HOST="http://host.com:8080"
PORT=8080 # May auto configured if using PaaS service like Heroku

# Database
DB_HOST="http://db.host.com:3306"
DB_USERNAME="Username"
DB_PASSWORD="NoOneShouldKnowThis"
DB_NAME="DatabaseName"

# oAuth
GITHUB_CLIENT_ID="github_client_id"
GITHUB_CLIENT_SECRET="github_client_secret"

# SendGrid API Key
SENDGRID_API_KEY="sendgrid_api_key"

```

## Test

```bash
yarn install
yarn start  # Compile and start
```

## Deploy

Will be added later.