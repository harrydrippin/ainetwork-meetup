# AINetwork Meetup Service

## Configuration: `.env`

This project needs `.env` file for the test and deploy. Example file format is below:
```bash
# Fundamentals
SERVER_HOST="http://host.com:8080"

# Database
DB_HOST="http://db.host.com:3306"
DB_USERNAME="Username"
DB_PASSWORD="NoOneShouldKnowThis"
DB_NAME="DatabaseName"

# oAuth
GITHUB_CALLBACK="/auth/github/callback"
GITHUB_CLIENT_ID="github_client_id"
GITHUB_CLIENT_SECRET="github_client_secret"
```

## Test

```bash
yarn install
yarn start  # Compile and start
```

## Deploy

Will be added later.