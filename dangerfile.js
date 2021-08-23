const {danger, warn} = require('danger')

/*
 * TODO: Also add GitLab stuff for Danger JS, once this repo is also on GitLab,
 * and also the CI/CD setup is completed.
*/

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 30) {
  warn('We believe no pull/merge request is too small to include a description of changes you made. Atleast 30 characters is needed in the PR/MR body to make this check to pass.');
}

// https://danger.systems/js/tutorials/node-library.html#keeping-on-top-of-your-library, lodash stuff are probably included in danger npm
// package, right?
const includes = require("lodash.includes");
const first = require("lodash.first")

// pull our guns for any changes in the CHANGELOG.md file
const hasCHANGELOGChanges = includes(danger.git.modified_files, "CHANGELOG.md")

// entry manifest files
const hasEntryManifestsChanges = first(danger.git.modified_files, path => path.startsWith("lists/"))
// our YAML schema JSON file we use for VS Code and other editors that support custom YAML schemas
const hasYAMLSchemaChanges = first(danger.git.modified_files, path => path.startsWith(".vscode/schemas/custom-yaml.json"))

if (hasEntryManifestsChanges && !hasCHANGELOGChanges) {
  warn("This pull request may need a CHANGELOG entry because changes in the `lists/` directory has been detected.")
}
if (hasYAMLSchemaChanges && !hasCHANGELOGChanges) {
  warn("This pull request may need a CHANGELOG entry because changes in our custom YAML schema has been detected.")
}
