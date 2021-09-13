# syntax=docker/dockerfile:1.3

# This Dockerfile is for running different parts of the codebase in production, like our Quality
# Assurance Probot app and the API itself, in one Alpine image. For development, please see
# either ../.gitpod.Dockerfile or ../.devcontainer/Dockerfile instead.

FROM alpine:3.14

WORKDIR /usr/src/rtapp-verify

# Copy everything first, excluding stuff on .dockerignore
COPY . .

# Install Node.js and Python from the edge repository, which we'll YOLO it.
# Plus don't forget to install all the needed packages btw.
RUN apk add --no-cache --repository https://dl-cdn.alpinelinux.org/alpine/edge/main \
      bash coreutils nodejs python3 py3-pip yarn npm dumb-init \
    # Since we didn't use Node Version Manager for this and instead rely on
    # Alpine's package repositories, there's no more `npm i -g yarn` step here.
    && yarn install \
    # Make sure you clone this repo with the --recursive flag or atleast initialized the
    # submodules with `git submodule update --init` command` which our docker:build
    # script will take care of it for you.
    && pip install ./utils/rss/dependencies/rfeed

# Next, install Doppler so we can manage secrets in production remotely while having the freedom
# for devs and contributors to manually set vars in development/localhost
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub \
    && apk add --no-cache --repository "https://packages.doppler.com/public/cli/alpine/any-version/main" doppler

# Finally, make our entrypoint scripts executable and create some symlinks
RUN chmod +x /usr/src/rtapp-verify/docker/entrypoint.sh && chmod +x /usr/src/rtapp-verify/docker/doppler-entrypoint.sh

ENTRYPOINT [ "/usr/src/rtapp-verify/docker/entrypoint.sh" ]
# Well, we're in an shell by default, but don't worry we use some trick there
# by passing commands to your docker run or via ENTRYPOINT_ARGS variable.