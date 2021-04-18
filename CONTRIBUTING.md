# Contributors' Guide to recaptime/verify

:+1::tada: First off, thanks for taking the time to contribute!
:tada::+1:

This project adheres to the Contributor Covenant [code of conduct][coc].
By participating, you are expected to uphold this code. Please report 
unacceptable behavior to <https://rtapp.tk/report-coc-violations>.

The following is a set of guidelines for contributing to `rtapp-verify`.
These are just guidelines, not rules. Use your best judgment and
feel free to propose changes to this document in a pull request.

[coc]: https://github.com/MadeByThePinsHub/policies/CODE_OF_CONDUCT.md

## Table of Contents - WIP
<!-- toc -->
- [Adding new entries to the list](#adding-new-entries-to-the-list)
  - [Using the Wizard](#using-the-wizard)
- [Glossary](#glossary)
<!-- tocstop -->

## Adding new entries to the list

Verifying an content creator/publisher starts with [filing an new issue in either GitHub][gh-new-issue]
or [GitLab][gl-new-issue] and pick an template that suits your case as
per [the process on the wiki][process-docs]. Once filed, our robots
will check if there's existing data and status if an PR exists.
You can either continue reading this section to send an PR yourself
or let us (or the community) handle the rest

[gl-new-issue]: https://gitlab.com/MadeByThePinsHub/RecapTime/verifh/issues/new
[gh-new-issue]: https://github.com/RecapTime/verify
[process-docs]: https://github.com/RecapTime/verify/wiki/Verification-Process

## Requirements to Commit

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
* Looks fine? Stage (`git add lists/`) and then commit with
either `yarn wizard:commit` (to use `cz`) or `yarn commit` to use
it's own pre-defined commit template.

### Required YAML fields

* `name` - Name of the creator/publisher you want to add
* `type` - either `contentCreator`, `publisher`, or `slugRedirect`.
* `redirectTo` - Only requored if `type` is `slugRedirect`.
* `socialLinks` - list of social linls in form of these:
```yaml
socialLink:
  - type: "other/forum"
    url: https://hyunsdojo.com
  - type: lbrynet # can be also odysee
    url: 
```
### Submission Guidelines

* New creator or publisher within the last 3 months? You need to wait
abit longer. Once

## Glossary

* Content Creator (or simply creator) - an individual or group of
people who creates content and publishes in any platform.
* Publisher - an entity for managing IP paperwork for Content Creators,
usually musoc labels. Others may be an news site, an production flim
corporation or any entity that publish stuff on Content Creator's
behalf.
