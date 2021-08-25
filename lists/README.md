# Entry Manifests Directory

This directory is where we keep the source YAML files and stuff for our future npmjs package, to be possibly
consumed by our app's server-side code in the future.

## Install and Usage

We recommend to use the API, through `@rtapp-verify/api-client` npm package for Node.js projects or choose an HTTP package for other non-Node.js packages that (in which we'll work on in the future), as the list manifest files updates on close-to-daily basis. If you fine with that, install this package: (if you use Dependabot, schedule upgrade PR on weekly basis)

```sh
# This package will be published to npmjs registry soon, it'll just noted here for future reference

# npmjs
npm install @rtapp-verify/list-manifests

# yarn
yarn add @rtapp-verify/list-manifests

# pnpm - todo
```

To use in your Node.js code:

```js
const { getMetadata, counter } = require("@rtapp-verify/");

// get verification metadata for an specific entry from an category in JSON for you
var dojo = getMetadata("community", "hyunsdojo");
console.log(dojo);

// get the index counter and send it as an Telegram message from your bot
// assuming we use an HTTP client for that instead of Telegraf.js
// Warning: WIP example code below!
var indexCounter = counter("all");
const yourHttpClient = require("axios")
```

## Structure

* Source YAML files
  * `.templates` - YAML starter templates to use for the Yeoman wizard, usually excluded when packaged as an npmjs package.
  * `communities` - List manifest files for communities
  * `creators` - List manifest files for content creators
  * `publishers` - List manifest files for content publishing entities
* Developer tooling and maintenance scripts, excluded when packaged as an npmjs package
  * `lib` - libraries for JavaScript-based scripts
  * `scripts` - scripts to automate some daunting tasks humans do
* npmjs Package Stuff
  * `.npmignore` - managing what files to ignore
  * `main.js` - main package entrypoint
  * `package.json` - package manifest file for Yarn to detect it in the root project directory.

## Adding, updating or disabling/burninating entries

More advanced documentation can be found [in the monorepo's maintainer documentation](https://recaptime.gitlab.io/verify/docs/maintainers/managing-entries), while the YAML schema/spec can be read [in this section](https://recaptime.gitlab.io/verify/docs/yaml-spec) for contributors.

### Adding new entries

**With the issue tracker**: [Use this issue form][form] for GitHub users or choose `AddNewEntry` in the issue template chooser for GitLab users and follow instructions (HTML comments in Markdown for GitLab users) before hitting the submit button.

<!-- update link below -->
[form]: https://github.com/RecapTime/verify/issues/new?todo=true

**With local copy of this monorepo**: After installing dependencies with Yarn in the root project directory, run `yarn entry-manifests:new-entry` (or `yarn entry-manifests:new-entry-onlycopy` if you don't like Yeoman) to open an wizard within the command line and follow instructions, then in your favorite code editor, edit the file as needed.

### Dsiabling and burninating entries

> **New to the word `burninate`?** In Stack Overflow/Stack Exchange network context, it is used to remove an tag, its questions and history (tag blocklisting is an seperate process). In the context of this repository, it is just replacing an entry with an burnination placeholder from `main` branch (without messing around Git history and npmjs package archives, which can be chaotic for everybody).

In case the social links went broken, when somebody (or even us) found something fishy, we'll disable the entry so both consumers of this package and the API will shown an `404 Not Found` error instead (or an expection for package users). This is recommended to do to give time on fixing issues before re-enabling access.

In case of an problem is servere enough or cannot be fixed (because the links are permanently broken, legal reasons, has violated our CoC), we elect to burninate it anyway at package and API access entry. We don't do hard burninating at Git history side, because it will be always an bloody hell for both us and contributors and end-user consumers who maintaining forks. What we do is just replace the content of the file to be burninated with [this one](.templates/uncategorized/burninated.yml), commit and push.

## Notes

* Once it an category subdirectory has reaches 1K files, you need to use GitHub Codespaces or Gitpod to navigate around.
