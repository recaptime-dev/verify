#!/usr/bin/dumb-init /bin/bash
#shellcheck shell=bash

# This is the main entrypoint script for our Docker image in production, where we do all
# the logic stuff here, especially on the ENTRYPOINT_ARGS part.
#
# Unless you know what you're doing, please do not run this script outside the container
# as script paths are hardcoded here and only intended for use in containers.

export ENTRYPOINT_ARGS=${ENTRYPOINT_ARGS:-"$@"}
export NODE_ENV=${NODE_ENV:-"production"}

# Check if we ever ran this script once inside the container, otherwise exits with non-zero code
if [[ $DOCKER_ENTRYPOINT_USED != "" ]]; then
  echo "Looks like you're attempting to rerun this entrypoint inside an container, right? Please create an seperate shell session instead." && exit 2
fi
export DOCKER_ENTRYPOINT_USED=1

# Main logic is here
main() {
    if [[ $1 == "qa-github" ]]; then
       yarn workspace @rtapp-verify/qa-bot run start
    elif [[ $1 == "api" ]]; then
       yarn workspace @rtapp-verify/api-server run start
    elif [[ $1 == "shell" ]]; then
       exec bash -li
    else
       exec "$@"
    fi
}

if [[ $ENTRYPOINT_ARGS == "" ]]; then
  exec bash -li
elif [[ $USE_DOPPLER_VARS != "false" ]] && [[ $DOPPLER_TOKEN != "" ]]; then
  exec /usr/src/rtapp-verify/docker/doppler-entrypoint.sh "$ENTRYPOINT_ARGS"
else
  main "$ENTRYPOINT_ARGS"
fi