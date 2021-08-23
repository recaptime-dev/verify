# Contributors' Guide to recaptime/verify

:+1::tada: First off, thanks for taking the time to contribute!
:tada::+1:

This project adheres to the Contributor Covenant [code of conduct][coc]. By participating, you are expected to uphold this code. Please report unacceptable behavior to <https://rtapp.tk/report-coc-violations>.

The following is a set of guidelines for contributing to the `rtapp-verify` project. These are just guidelines, not rules. Use your best judgment and feel free to propose changes to this document in a pull request.

[coc]: https://github.com/MadeByThePinsHub/policies/blob/master/CODE_OF_CONDUCT.md

## Table of Contents - WIP

<!-- toc -->
- [Adding new entries to the list](#adding-new-entries-to-the-list)
- [Using the Wizard](#using-the-wizard)
- [Writing it Yourself](#writing-it-yourself)
- [Final Steps](#final-steps)
- [YAML Spec/Schema](#yaml-specschema)
- [Submission Guidelines](#submission-guidelines)

<!-- tocstop -->

## Requirements for Commit Messages

* By commiting your work and sending an merge request to the
project, your work will be licensed under
* Your commit message should be looks like this format below.
If you use `yarn commit`, you don't need to memorize the format
below, because Commitizen CLI will handle it for you. You just
stage your changes, run the wizard and push.

```gitmessage
# Ensure the summary only have 80 characters or GitHub will cut it for mobile web users, unless visited the file/repo history.
type(scope): TLDR form of your commit message goes here
# where type is an type that's supported from the conventional-changelog plugin for Commitizen CLI
# see https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#typ for the full list of these supported types from Angular's
# contributing guidelines.
# in case of reverting an commit, use the revert type.

Your longer message should be goes here. Remember that comments start with
hash in at first character of the line will be ignored by Git. Also remember to
keep your characters below 100 PER LINE.

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
Signed-off-by: Gildedguy (Michael Moy) <lets-assume-its-mikedmoy-here@kensored-domain.io>
# also add coauthors to thank them (e.g. if you applied their
# patches from email)
Co-authored-by: oxob3000 (Johannes Andersson) <lets-assume-its-boxob@kensored-domain.io>
```

* Even without signing-off your commits, we recommend to PGP sign your commits to ensure that you REALLY commit your work and has the right to submit so.
* While DCO checks may fail and block us from merging it, we may opt to manual merging through the command line if needed. PLEASE SIGN OFF YOUR COMMITS AND IF NEEDED, PLEASE REBASE WITH `signoff` FLAG AND FORCE PUSH.

## Adding new entries to the list

Verifying an content creator/publisher starts with [filing an new issue in either GitHub][gh-new-issue]
or [GitLab][gl-new-issue] and pick an template that suits your case as
per [the process on the wiki][process-docs]. Once filed, our robots
will check if there's existing data and status if an PR exists.
You can either continue reading this section to send an PR yourself
or let us (or the community) handle the rest

[gl-new-issue]: https://gitlab.com/MadeByThePinsHub/RecapTime/verify/issues/new
[gh-new-issue]: https://github.com/RecapTime/verify/issues/new
<!-- Update link to use the new docs site instead of GH Wiki -->
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

Right after cloning the repo and installing the deps, run `yarn add-entry:chooser-noform` to select an category, enter desired slug name and copy it to `lists/<creators|publishers|communities>/slug-name.yml` then edit the file as usual with your favorite IDE of choose (why you use Vim if you're inside VS Code/Codespaces/Gitpod workspace?)

### Final Steps

* Run the linter with `yarn entry-manifests:lint` to ensure its compliant
with our schema, and also lint YAML files.
* (optionally) Try running the development server with `yarn dev` and try to lookup your new entry either in the webapp or directly to the API through cURL.
* Looks fine? Stage the files (`git add lists/`) and then
commit with `yarn wizard:commit` (shortcut to `yarn commit`).

### YAML Spec/Schema

Our YAML schema JSON file is at [`.vscode/schemas/custom-yaml.json`](.vscode/schemas/custom-yaml.json), in case you're gonna use this in other editors ther than VS Code.
The human-firendly version of these can be found at [our docs site](https://recaptime.github.io/verify/docs/yaml-spec).

### Submission Guidelines

_Moved into an seperate document at [`meta/SUBMISSION_GUIDELINES.md`](meta/SUBMISSION_GUIDELINES.md)._
