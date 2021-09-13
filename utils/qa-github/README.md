# Quality Assurance GitHub App

> A GitHub App built with [Probot](https://github.com/probot/probot) that developed for automating QA workflows in GitHub repos
for [verify](https://github.com/RecapTIme/verify) and [app](https://github.com/RecapTime/app) at @RecapTime org.

## Setup / Running Locally

```sh
# PnP is enabled in this repo, but you probably want to duoble check
yarn install

# Run the bot
yarn workspace @rtapp-verify/qa-bot
```

## With Docker

```sh
# 1. Build container using this project-wide Yarn script
yarn docker:build-localdev

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> ghcr.io/recaptime/verification-endpoint-monorepo:localdev qa-github
```

## Contributing

If you have suggestions for how rtapp-qa-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](../../CONTRIBUTING.md).

## License

[MIT](../../LICENSE) © 2021 Andrei Jiroh Eugenio Halili <ajhalili2006@gmail.com> and contributors
