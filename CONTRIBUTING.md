# Contributors' Guide to recaptime/verify

:+1::tada: First off, thanks for taking the time to contribute!
:tada::+1:

This project adheres to the Contributor Covenant [code of conduct][coc].
By participating, you are expected to uphold this code. Please report 
unacceptable behavior to <https://rtapp.tk/report-coc-violations>.

The following is a set of guidelines for contributing to `rtapp-verify`.
These are just guidelines, not rules. Use your best judgment and
feel free to propose changes to this document in a pull request.

[coc]: https://github.com/MadeByThePinsHub/policies/blob/master/CODE_OF_CONDUCT.md

## Table of Contents - WIP

<!-- toc -->
- [Requirements for Commit Messsages](#requirements-for-commit-messages)
- [Adding new entries to the list](#adding-new-entries-to-the-list)
  - [Using the Wizard](#using-the-wizard)
- [Glossary](#glossary)
<!-- tocstop -->

## Requirements for Commit Messages

* By commiting your work and sending an merge request to the
project, your work will be licensed under
* Your commit message should be looks like this format below.
If you use `yarn commit`, you don't need to memorize the format
below, because Commitizen CLI will handle it for you. You just
stage your changes, run the wizard and push.
```gitmessage
# Ensure the summary only have 80 characters or GitHub will
# cut it for mobile web users, unless visited the file/repo
# history.
type(component): TLDR form of your commit message goes here
# where type is an type that's supported from the
# conventional-changelog plugin for Commitizen CLI
# see https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#typ
# for the full list of these supported types from Angular's
# contributing guidelines.
# and component is one of the following:
# - lists - updates to the entries in the directory
# - docs - Documentation changes, including doing commits inside
#   the docs module, README and contributing guidelines.
# - manual - alias of docs
# - deps-* - changes to the Node.js dependencies (deps, deps-dev,
#   deps-optional, deps-peer). REMEMBER TO STAGE ANY CHANGES IN
#   .yarn/cache AND .pnp.js (new deps in MRs will be reviewed
#   before getting merged for security reasons.
# - yarn - Anything related to Yarn, including config changes in
#   the .yarnrc.yml file
# - github-actions - GitHub Actions-related stuff.
# - gitlab-cicd - GitLab CI/CD-related stuff
# - vercel-config - Everything releated to Vercel config file
#   (vercel.json)
# -

Your longer message should be goes here. Remember
that comments start with hash in at first character of the
line will be ignored by Git. Also remember to keep your
characters below 80.

# reference to an issue in GitHub
Fixes https://github.com/RecapTime/verify/issues/2
# or in GitLab
Fixes https://gitlab.com/MadeByThePinsHub/RecapTime/verify/issues/3

# optional links to the comment in an PR where the reviewer
# requests you to change something
Reference: https://github.com/benawad/dogehouse/pull/2035/commits/ee06dd45405c23e91b2232e5a4a6daf2f2052b3f

# don't forget to sign-off your commit to be compliant with
# DCO checks we're implementing. Org members in GitHub
# can skip this, only if they do GPG signing.
# PS: No email addresses were spammed in writing of this example
# Git commit message.
# Also sign-offs are not inclided when ran the Commitizen CLI
# to commit your changes to the history, yet.
Signed-off-by: Gildedguy (Michael Moy) <lets-assume-its-michael-moy-here@kensored-domain.io>
# also add coauthors to thank them (e.g. if you applied their
# patches from email)
Co-authored-by: oxob3000 (Johannes Andersson) <lets-assume-its-boxob@kensored-domain.io>
```
* Even without signing-off your commits, we recommend to PGP
sign your commits to ensure that you REALLY commit your work
and has the right to submit so.
* While DCO checks may fail and block us from merging it,
we may opt to manual merging through the command line if needed.

## Adding new entries to the list

Verifying an content creator/publisher starts with [filing an new issue in either GitHub][gh-new-issue]
or [GitLab][gl-new-issue] and pick an template that suits your case as
per [the process on the wiki][process-docs]. Once filed, our robots
will check if there's existing data and status if an PR exists.
You can either continue reading this section to send an PR yourself
or let us (or the community) handle the rest

[gl-new-issue]: https://gitlab.com/MadeByThePinsHub/RecapTime/verify/issues/new
[gh-new-issue]: https://github.com/RecapTime/verify/issues/new
[process-docs]: https://github.com/RecapTime/verify/wiki/Verification-Process

### Using the Wizard

> We'll working on an CLI wizard for making your life easier in adding
new entries into the database.

To get started, fork the repository and clone, install dependencies
with `yarn` and run `./bin/generate-metatdata [creator|publisher]`
or `yarn wizard:[creator|publisher]`.

Make sure you fill up the required fields or things will go brrr.
After completing the wizard, navigate to `lists/your-slug-here`
and check the `TODO_LIST.md` for things you need to finish.

### Writing it Yourself

Right after cloning the repo and installing the deps:

* Run `npm run wizard:add-entry-noprompt` to just copy
files from `templates/` into
`lists/slug-goes-here`. The template
files provide some starting point to just add the needed fields in
minutes.
* Read `TODO_LIST.md` on that directory on what to do next.

### Final Steps

* Run the linter with `npm run lint:lists` to ensure its compliant
with our policies.
* (optionally) Try running the development server with `yarn dev` and try to lookup your
new entry either in the GUI or directly to the API through cURL.
* Looks fine? Stage the files (`git add lists/`) and then
commit with `yarn wizard:commit` (shortcut to `yarn commit`).

### Required YAML fields

* `name` - Name of the creator/publisher you want to add
* `type` - either `contentCreator`, `publisher`
* `socialLinks` - list of social linls in form of these:
```yaml
socialLink:
  - type: forum
    url: https://hyunsdojo.com
  - type: lbrynet # can be also odysee
    # remember to use open.lbry.com or odysee.com links instead of
    # lbry:// ones so people from the web can view it without the LBRY apps.
    url: https://odysee.com/@MichaelLuzzi:7
    isMirror: true # if mirrors from other platform, set to true
  # there are some cases where hoomans upload content to
  # other platforms themselves, so the isMirror flag is only
  # applied to robots.
  - type: fediverse # if fediverse, ensure that profile links are available on atleast 2 instances of ActivityPub-supported servers
    url: https://birdsite.slashdev.space/@benawad
    isUnofficial: true # if fan account, set isUnofficial to true
```
* `category` - TODO
```yam
# probably you checked the categories from Twitch, eh?
# it can be one-string entry
category: 'Arts & Animation'

# or YAML-friendly lists
category:
  - Arts & Animation
  - Science & Technology
```

### Submission Guidelines

* New creator or publisher within the last 3 months? You need to wait
abit longer. Once reached the 3-month-old, you can submit your
request here.
* While we want to have communities, creators and publishers of
all sizes, our response times and review times may varies. Please
don't expect too much.
* In case we're unavailable to merge your PR, the open-source
community is allowed to review and handle these requests and PRs
as needed to help the maintainers (us + some trusted members of the
community).
* We'll look at track records of entries you submit and we have
on an regular basis and remove from this registry if found an
major violation to either our Community Code of Conduct or
any of Philippine/US/EU laws. If in doubt, please contact an
attorney for help so we can assess these cases better.

## Glossary

* Content Creator (or simply creator) - an individual or group of
people who creates content and publishes in any platform.
* Publisher - an entity for managing IP paperwork for Content Creators,
usually musoc labels. Others may be an news site, an production flim
corporation or any entity that publish stuff on Content Creator's
behalf.
