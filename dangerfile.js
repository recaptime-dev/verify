const {danger, fail, markdown, warn, message} = require('danger')

/*
 * TODO: Also add GitLab stuff for Danger JS, once this repo is also on GitLab,
 * and also the CI/CD setup is completed.
*/

// some code includes stuff from https://www.typescriptlang.org/play?ssl=29&ssc=2&pln=26&pc=1#code/PTAEBUAsEsGdTqAhqADgGyQTwOYCcB7AVwDsATUAd0gFM8bQtjQBjJE0GgDwwPtAAutUABF2OOqABSAZQBQIUAEEACgElk5ULEhJ+LAmQawkAWww1YAOlAB5EiwZCG9CumglLoAEY10BSlAAIjJxOiCFMHYKINQkISDkfhwCT0FaDiYiVnZtAT0BQQJOHn9+SjxoAQ8cSNA8InQvADM+UTC8Zugm6zk5aHM+QoBvUFCSCTwAGlBmpG6Z0z0AazIAkhnKPQ3QU0sTCVAAX1nCU2DxyYiB1CHQACpkeDihU4Jz2PjICLrVDXpmnQaA4aAAuUCQAQCVCwUEgS50KywLCwAQ0UywYAAK0xAKBIKskNM6D6BhIqLQeFAAF4xh0rDgqpAiN4rKg8H1FAAxDwUYiFaDNbTvBhxPDVFiNPSzbpeXQANwYLF0ExoFA86UQKgASqA5GSKWtJXsSPlqqkaXTVXgGVUrF0mgBZeLKgAUQXu92A9yspjIQQAlPrUhTlWF-DhLQibYyBPbZc6BG6ggBhAASSgAcgBxACiABlbNnff6gwbCnEWMskBIpLALbTo7a4w6aInk5XqxIrDjUoHg+TCv4q62o-TY-GnS7IO6sNsrMPlkEZp8qzWaABaRc9+skft1bWNSycsBQdjLWYEdDLeCtKlLZY1MYEFisFUSWD9IWuo1EE1m6BUisNUqjVANQGGORQGg3Z9nXd0zxIG9QA3UAAHUGFBWgCnBYgqQAbV-f89GgdhYAAXVdSFoThYBKHoqwKlA5wjWsPgcGAAMAEJ+yOE9QG1dFeTQGgCAsIpQCIVBQjRUBF1bT9BVAV1O3XOsgNMQxBWgNVQAAMj00AuPk2VfS0rowIgqCYK2PASAQmB4B1XZzJ0ihVO7Xsdm8IhChIAhCmcOSX2WVteP4tCMnSIEkgYJBUFQDcw1VeBogQQoiHgfzChQZyljwZZdKQeABEqeVSPQGZuFQGgWAEOpnH4ARil8UB0yzPNC2zN8wl6ctBDKirnNpdkrG8QwsCsDwWHQIgjFgd1SugcqkHQfslNdLjkokCNgLIUCKAMoylpW9AdXAyDoLmbp3UzYp2pzAsi2QMgjDIKxwrqO7QGcxBmuKWAlnQdAJNsvB2BytA9BrcHUEgUA2gEShigIIVYD-fKsC-ZTRvGshJqaCZXmpEnQAABgu6zrvQd0VCaYq4te5AxksFhKlQc0OGaxg8J+7UPqDPjFCUdAthRThySIco4tgWBoBwDh6z2VInGKXLtRmJSqlS7GVJtYq5YVmgGBJ2kSEadBKeg-q9iEQxLVG6oBCaKaHFm+b3TQtQVEDUAAH4qG2UBwWp6zbcgQxafp2AZcNxWRRViS9jwQ4hC1DXND5DnAJIVb0CwBA3bm0VRPE6gAYjxoKHocqaEoAW5D4upc0lprdEhzBfBB3R4F8YFtBoeqNqbWNmVZOB0ZoBckC76xCZwYnSYpqzoNs+ygigdPny8bKISQRVNALzu-GscKgA
const pr = danger.github.pr
const mr = danger.gitlab.mr // IDK if that works, but lemme check da docs

// https://danger.systems/js/tutorials/node-library.html#keeping-on-top-of-your-library, lodash stuff are probably included in danger npm
// package, right?
const includes = require("lodash.includes");
const first = require("lodash.first")

// Find out if some particular files have changed in this PR 
// docs
const documentation = danger.git.fileMatch("**/*.md")
// changelogs
const EMchangelog = danger.git.fileMatch("lists/CHANGELOG.md")
const docsChangelog = danger.git.fileMatch("pages/CHANGELOG.md")
// manifests + lockfiles
const YarnManifest = danger.git.fileMatch("**/package.json")
const lockfileYarnpkg = danger.git.fileMatch("yarn.lock")
// individual packages
const hasEntryManifestsChanges = first(danger.git.modified_files, path => path.startsWith("lists/"))

// Andrei Jiroh is not only the team lead at The Pins Team/Recap Time Squad, but also
// the project lead here. If you ever use ours, change this below.
const projectLead = "ajhalili2006"

// stuff for entry manifest files and our YAML schema JSON file we use for VS Code and other editors that support custom YAML schemas
const hasYAMLSchemaChanges = first(danger.git.modified_files, path => path.startsWith(".vscode/schemas/custom-yaml.json"))
if (hasEntryManifestsChanges && !EMchangelog) {
  warn("This pull request may need a CHANGELOG entry because changes in the `lists/` directory has been detected. Add atleast one at `lists/CHANGELOG.md` file.")
}
if (hasYAMLSchemaChanges && !docsChangelog) {
  warn("This pull request may need a CHANGELOG entry because changes in our custom YAML schema has been detected. Add atleast one at `lists/CHANGELOG.md` file.")
}

// Thank folks for making doc changes
if (documentation.edited) {
    message("Thanks - We :heart: our [documentarians](http://www.writethedocs.org/)!")
}

// Remind people to update lockfiles, may considering using danger
if (YarnManifest.modified && !lockfileYarnpkg.modified) {
  warn("We found changes to the manifest files, but the Yarn lockfile isn't updated. Did you just updated the scripts?")
}

// Ensure there's atleast one assignee in each PR
// In GitLab, WIP is being deprecated in favor of Draft as prefix.
if (pr.assignee === null) {
  const method = pr.title.includes("WIP:") ? warn : fail
  method("Please assign someone to merge this PR, and optionally include people who should review.")
}

// No PR is too small to include a description of why you made a change
if (pr.body.length < 30) {
  warn('We believe no pull/merge request is too small to include a description of changes you made, but please add an few words to describe your PR in 30 or more characters.');
} else if (pr.body.length === 0) {
    fail("We believe no pull/merge request is too small to include a description of changes you made, please add a description to your PR.")
} else {
  message("Nice! Just make sure the PR body doesn't contain nonsense stuff that we think it's unimportant to reach 30+ characters.")
}

// Don't have folks setting the package json version
const apiServerPkgDiff = danger.git.JSONDiffForFile("package.json")
const releaseDispatchGH = danger.github.issue.labels.includes('release-dispatcher')
if (apiServerPkgDiff.version && releaseDispatchGH != true && pr.user.login !== projectLead) {
  fail("For contributors, please don't make package version changes.\n\nIf you're an team member at The Pins Team (we consider Recap Time squad members as part of The Pins Team, through the `@RecapTime/squad` team membership) or an community maintainer here, ping Andrei Jiroh so he can help you cut an new release for the API server. If he's not available, add `release-dispatcher` label to dismiss this error and check the Release workflow in maintainer docs. Make sure to coordinate with your fellow maintainers as you ship new releases.")
}
