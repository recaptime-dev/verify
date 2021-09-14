# Production Grade Docker Image for Verification Endpoint monorepo

## Usage

The `docker run` usage for the image looks like this:

```sh
# when running from prebuilt ones from GHCR/GitLab Container Registry, there's no localdev
# tag
docker run --rm -it ghcr.io/recaptime/verification-endpoint-container:localdev <shell cmmands or entrypoint command here>
```

In case you're deploying parts of the codebase to production on your own on regular Dockerfile-based PaaS services (e.g. Heroku, Railway, etc.), please set commands through the `ENTRYPOINT_ARGS` variable. Supported commands are:

* `qa-github` for running our GitHub app for QA and other automation stuff that Danger can't handle
* `api` for running your own `verify.rtapp.io` registry, using contents from `lists` directory as database (requires new deploy/server restart to apply new changes)
* `docs` for locally building and viewing production-grade docs site within your machine, may be included in the future once the docs site is ready
* regular shell commands (even you can run Yarn commands there), through Git-related actionsmay not work since this image is optmized for production

## Build from source

1. Make sure submodules are initialized properly, especially there's an Python package that we'll install from source. If the build failed due to mising files, try running `yarn submodules:init` first.
2. Run `yarn docker:build` to build the image based on Alpine.
3. Once the image successfully built, run `yarn docker:run` without arguments to enter internactive shell inside the container.
