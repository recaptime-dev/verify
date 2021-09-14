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

## General Guidelines for Development

* We use Yarn as our package manager here, with strict Plug 'n Play mode by default. Do not make changes to the Yarn configuration file (`.yarnrc.yml`). Don't use the regular npm or even pnpm here as mixing package managers will only cause chaos.
* Don't touch our DangerJS files in the `danger` directory. Unless you know what you're doing, any breaking changes may break future PRs so please test Dangerfile changes on your own first.
* Add or update tests as possible. Currently, code tests are not yet implemented here but it will somewhat in the future.

## Requirements for Commit Messages

* By commiting your work and sending an merge request to the project, your work will be licensed under the same license as this repo.
* We use Conventional Changelog as our format for the Git messages. To make your life easier, please stage your work into the staging area and run `yarn commit` (or `yarn wizard:commit` if you're not on the root directory) and follow prompts.
* Even without signing-off your commits, we recommend to PGP sign your commits to ensure that you REALLY commit your work and has the right to submit so.
* While DCO checks may fail and block us from merging it, we may opt to manual merging through the command line if needed. PLEASE SIGN OFF YOUR COMMITS AND IF NEEDED, PLEASE REBASE WITH `signoff` FLAG AND FORCE PUSH.

## Adding new entries to the list

Verifying an content creator/publisher starts with [filing an new issue in either GitHub][gh-new-issue]or [GitLab][gl-new-issue] and pick an template that suits your case as per [the process on the wiki][process-docs]. Once filed, our robots will check if there's existing data and status if an PR exists. You can either continue reading this section to send an PR yourself or let us (or the community) handle the rest.

The scripts described here currently doesn't exist today, but maybe in an constant future as development continues, but if you wish, we welcome external contributions for these.

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
