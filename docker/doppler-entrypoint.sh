#!/bin/bash

# This script is just an axuliary to our main entrypoint script, usually called when we
# found some Doppler-related variables and the user doesn't either set USE_DOPPLER_VARS
# to false (even there are DOPPLER_TOKEN) or we found some Doppler-related stuff.

# Same logic, but we exec stuff through the 'doppler run' command
main() {
    if [[ $1 == "qa-github" ]]; then
       exec doppler run -- yarn workspace utils/qa-github run start
    elif [[ $1 == "api" ]]; then
       exec doppler run -- yarn workspace api run start
    else
       exec doppler run --command="$*"
    fi
}

main "$@"