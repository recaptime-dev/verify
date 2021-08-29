const { danger, fail, markdown, warn, message } = require("danger");
const mr = danger.gitlab.mr;
const author = mr.author.username;

// https://danger.systems/js/tutorials/node-library.html#keeping-on-top-of-your-library, lodash stuff are probably included in danger npm
// package, right?
const includes = require("lodash.includes");
const first = require("lodash.first");

// Find out if some particular files have changed in this PR
// docs
const documentation = danger.git.fileMatch("**/*.md");
// changelogs
const EMchangelog = danger.git.fileMatch("lists/CHANGELOG.md");
const docsChangelog = danger.git.fileMatch("pages/CHANGELOG.md");
// manifests + lockfiles
const YarnManifest = danger.git.fileMatch("**/package.json");
const lockfileYarnpkg = danger.git.fileMatch("yarn.lock");
// individual packages
const hasEntryManifestsChanges = first(danger.git.modified_files, (path) =>
  path.startsWith("lists/")
);

// Andrei Jiroh is not only the team lead at The Pins Team/Recap Time Squad, but also
// the project lead here. If you ever use ours, change this below. Probably turn this into
// an array of usernames in the future
const projectLead = "ajhalili2006";

// Dangerfiles
const Dangerfiles = danger.git.fileMatch("danger/*.js");
const ignoreWarningDangerfile = danger.github.issue.labels.includes(
  "chores/dangerfile"
);
if (Dangerfiles && author != projectLead) {
  fail(
    "Do not change the Dangerfiles! If you're here to help us improve our Dangerfiles, please ping an maintainer to add `chores/dangerfile` label."
  );
} else if (Dangerfiles && author == projectLead) {
  message(
    "Hey, @" +
      projectLead +
      "! Looks like you're about to change Dangerfiles, right? Please create an new issue about these changes so the community will review changes and collect feedback."
  );
} else if (Dangerfiles && author != projectLead && ignoreWarningDangerfile) {
  message(
    "Changes to the Dangerfiles are being reviewed by an human as `chores/dangerfiles` is being labeled."
  );
}

// stuff for entry manifest files and our YAML schema JSON file we use for VS Code and other editors that support custom YAML schemas
const hasYAMLSchemaChanges = first(danger.git.modified_files, (path) =>
  path.startsWith(".vscode/schemas/custom-yaml.json")
);
if (hasEntryManifestsChanges && !EMchangelog) {
  warn(
    "This pull request may need a CHANGELOG entry because changes in the `lists/` directory has been detected. Add atleast one at `lists/CHANGELOG.md` file."
  );
}
if (hasYAMLSchemaChanges && !docsChangelog) {
  warn(
    "This pull request may need a CHANGELOG entry because changes in our custom YAML schema has been detected. Add atleast one at `lists/CHANGELOG.md` file."
  );
}

// Thank folks for making doc changes
if (documentation.edited) {
  message(
    "Thanks - We :heart: our [documentarians](http://www.writethedocs.org/)!"
  );
}

// Ensure there's atleast one assignee in each PR
// In GitLab, WIP is being deprecated in favor of Draft as prefix.
if (mr.assignee === null) {
  const method = pr.title.includes("Draft:") ? warn : fail;
  method(
    "Please assign someone to merge this MR, and optionally include people who should review."
  );
}

// No PR is too small to include a description of why you made a change
if (mr.description === null) {
  fail(
    "We believe no pull/merge request is too small to include a description of changes you made, please add a description to your MR."
  );
} else if (mr.description.length < 30) {
  warn(
    "We believe no pull/merge request is too small to include a description of changes you made, but please add an few words to describe your MR in 30 or more characters."
  );
} else {
  message(
    "Nice! Just make sure the PR body doesn't contain nonsense stuff that we think it's just unimportant to reach 30+ characters."
  );
}

// Don't have folks setting the package json version
const apiServerPkgDiff = danger.git.JSONDiffForFile("api/package.json");
const releaseDispatch = mr.labels.includes("release-dispatcher");
if (
  apiServerPkgDiff.version &&
  releaseDispatch !== true &&
  author !== projectLead
) {
  fail(
    "For contributors, please don't make package version changes for `@rtapp-verify/server`. If you're an team member at The Pins Team (we consider Recap Time squad members as part of The Pins Team, through the `@RecapTime/squad` team membership in GitHub) or an community maintainer here, ping Andrei Jiroh so he can help you cut an new release for the API server. If he's not available, add `release-dispatcher` label to dismiss this error and check the Release workflow in maintainer docs. Make sure to coordinate with your fellow maintainers as you ship new releases."
  );
}
