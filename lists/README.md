# Entry Manifests Directory

This directory is where we keep the source YAML files and stuff for our future npmjs package, to be possibly
consumed by our app's server-side code in the future.

## Install and Usage

To install this package:

```sh
# This package will be published to npmjs registry soon, it'll just noted here for future reference

# npmjs
npm install @rtapp-verify/list-manifests

# yarn
yarn add @rtapp-verify/list-manifests
```

To use in yur code:

```js
// coming soon
```

## Source Directories Structure

* Source YAML files
  * `.templates` - YAML starter templates to use for the Yeoman wizard.
  * `communities` - List manifest files for communities
  * `creators` - List manifest files for content creators
  * `publishers` - List manifest files for content publishing entities
* Developer tooling and maintenance scripts
  * `lib` - libraries for JavaScript-based scripts
  * `scripts` - scripts to automate some daunting tasks humans do

## Notes

* Once it an category subdirectory has reaches 1K files, you need to use GitHub Codespaces or Gitpod to navigate around.
