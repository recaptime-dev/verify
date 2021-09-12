# RSS Feed Stuff

## Accessing the feed

Our RSS feed has 2 variants, one for use in [Feedburner](https://feedburner.google.com/) to keep it below 1 MB
and one for historical purposes, which can be accessible throguh the following URLs:

* **Recent Activity** (50 activities or less): `https://raw.githubusercontent.com/RecapTime/verify/main/utils/rss/out/recent.xml`
* **Historical Activity** (alot larger, may our FeedBurner mirror don't update due to size:
`https://raw.githubusercontent.com/RecapTime/verify/main/utils/rss/out/all.xml`

## For Maintainers

Currently, there's no automated processes yet to automate this, but contributions are welcome btw.

* Install Python 3.x on your system, if not already.
* Make sure to `git pull upstream main` (use `origin` for maintainers) and `git submodule update --init --recursive` before
proceeding to the package install. Then run `yarn py3:install-rfeed` to install the package into the userspace Python packages.
* Edit `recent_activity.py` to include an new entry or update existing ones, just make sure to follow to these formats. Don't forget to
add the new entry to the `items` array at the feed variable for the Atom feed generator to catch new changes.

```py
### Changes through PRs/MRs ###
# 1234abcd coresponds to the short commit hash
conmit1234abcd = Item(
        title = "feat(lists): add <entry-slug-name> to <category>",
        link = "https://gitlab.com/RecapTime/verify/commit/mergeCommitIdHere",
        # If happened in GitHub, replace GitLab MR links with GitHub PR links.
        description = "Please see https://gitlab.com/RecapTime/verify/merge_requests/1234 for details on how these changes are being merged.",
        author = "Maintainer Name Who Merge This",
        # Also repeat the same here.
        guid = Guid("https://gitlab.com/RecapTime/verify/merge_requests/1234"),
        # When updating published date, remember thee format YYYY, MM, DD, HH, MM and use UTC timezone
        # as much as possible. Also check the Git commit log and possibly convert them into UTC time as possible.
        pubDate = datetime(2021, 9, 18, 11, 45, timezone.utc))
### Changes through Regular Push ####
commit5678efgh = Item(
        title = "feat(lists): add <entry-slug-name> to <category>",
        link = "https://gitlab.com/RecapTime/verify/commit/mergeCommitIdHere",
        # If happened in GitHub, replace GitLab MR links with GitHub PR links.
        description = "Please see https://gitlab.com/RecapTime/verify/merge_requests/1234 for details on how these changes are being merged.",
        author = "Maintainer Name Who Merge This",
        # Also repeat the same here.
        guid = Guid("https://gitlab.com/RecapTime/verify/merge_requests/1234"),
        # When updating published date, remember thee format YYYY, MM, DD, HH, MM and use UTC timezone
        # as much as possible. Also check the Git commit log and possibly convert them into UTC time as possible.
        pubDate = datetime(2021, 9, 12, 11, 45, timezone.utc))
```

* Generate the recent activity feed with `yarn rss-generator:recent`.
* For updating the historical feed, copy your new entries to `historical_activity.py` and add the new entry to the `items` array at the
feed variable, as usual.
* Now, generate these files with `yarn rss-generator` script.
* Finally, format 'em all with Prettier with `yarn prettier:atom-feeds`. Don't forget to commit and push so RSS Readers keep in sync.
