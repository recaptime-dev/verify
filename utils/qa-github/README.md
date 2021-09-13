# Quality Assurance GitHub App

> A GitHub App built with [Probot](https://github.com/probot/probot) that developed for automating QA workflows in GitHub repos
for [verify](https://github.com/RecapTIme/verify) and [app](https://github.com/RecapTime/app) at @RecapTime org.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t rtapp-qa-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> rtapp-qa-bot
```

## Contributing

If you have suggestions for how rtapp-qa-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](../../CONTRIBUTING.md).

## License

[MIT](../../LICENSE) © 2021 Andrei Jiroh Eugenio Halili <ajhalili2006@gmail.com> and contributors
