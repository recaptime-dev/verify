const commands = require("probot-commands");
const metadata = require("probot-metadata");
const debugIssue = {
  owner: "RecapTime", // still same org btw
  repo: "qa-bot-debugging-tracker", // an private repo for debugging stuff
  issue_number: 1, // probably?
};

module.exports = (app) => {
  // TODO: Only the maintainers should ever fuse this command. You can always
  // comment on an issue to unstale as always.
  commands(app, "unstale", unstaleForever);
  commands(app, "stale", removeUnstaleLabel);

  async function unstaleForever(context) {
    if (context.payload.labels.includes == "stale") {
      context.octokit.issues.removeLabel(context.issue({ name: "stale" }));
    }

    // idk if this works, but yolo
    context.octokit.issues.deleteComment(context.payload.comments.id);

    const label = "never-stale";
    return context.octokit.issues.addLabels(context.issue({ label }));
  }

  async function removeUnstaleLabel(context) {
    if (context.payload.labels.includes == "never-stale") {
      return context.octokit.issue.removeLabel(
        context.issue({ name: "never-stale" })
      );
    } else {
      return console.log("TODO");
    }
  }
};
