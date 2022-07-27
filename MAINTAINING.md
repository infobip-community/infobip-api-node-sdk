# Maintaining the Infobip Node.js SDK

## Code of Conduct

Please review, understand, and be an example of our [code of conduct](CODE_OF_CONDUCT.md). Violations of the code of conduct are to be taken seriously, even (especially) by maintainers.

## Issues

We want to support and build the community. We do that best by helping people learn to solve their own problems. We have an issue template, and hopefully, most folks follow it. If it's not clear what the issue is, invite them to create a minimal reproduction of what they're trying to accomplish or the bug they think they've found.

Once it's determined that a code change is necessary, point people to [makeapullrequest.com](http://makeapullrequest.com) and invite them to make a pull request. If they're the one who needs the feature, they're the one who can build it. If they need some hand-holding and you have time to lend a hand, please do so. It's an investment into another human being and a potential maintainer.

## Pull Requests

As a maintainer, you're fine to make your branches on the main repo or on your own fork. Either way is fine.

When we receive a pull request, tests are run automatically via a GitHub Action. See [`.github/test.yml`](.github/test.yml) for what runs in the tests. We avoid merging anything that breaks the tests or doesn't maintain 100% test coverage.

Please review PRs and focus on the code rather than the individual. You never know when this is someone's first-ever PR, and we want their experience to be as positive as possible, so be uplifting and constructive.

When you merge the pull request, 99% of the time, you should use the [Squash and merge](https://help.github.com/articles/merging-a-pull-request/) feature. This keeps our git history clean, but more importantly, this allows us to make any necessary changes to the commit message, so we release what we want to release. See the next section on Releases for more about that.

## Releasing a new version

There are a few steps you should follow every time you publish a new version of the SDK to npm:

1. Update [CHANGELOG.md](CHANGELOG.md) with an entry for the new version
    - Consider what the next version will be. If the new release contains any breaking changes, please bump the minor version (we usually consider a breaking change to be one that is [source incompatibile](https://en.wikipedia.org/wiki/Source-code_compatibility)).
1. Update the version in `package.json`
1. Run the linter locally via `npm run lint`
1. Run the tests locally via `npm run test`
1. Build the project locally via `npm run build`
1. Commit the new version to GitHub
1. Release via `npm publish` and tag a new version on GitHub to match.

## Style Guide

We use an automatic code formatter called Prettier. Run `npm run lint` after making any changes to the code.

Then, our linter will catch most issues in your code. You can check the status of your code styling by simply running `npm run lint`.

However, there are still some styles that the linter cannot pick up. If you are unsure about something, looking at [Airbnb's Style Guide](https://github.com/airbnb/javascript) will guide you in the right direction.

## Development Workflow

After cloning the SDK, run `npm install` to fetch its dependencies. Then, you can run several commands:

-`npm run lint` checks the code style and fixes any issues it finds.
-`npm run test` runs the complete test suite and generates a test coverage report. You can find the report locally at `/coverage/lcov-report/index.html`.
-`npm run build` creates a build folder with all the packages.
-`npm run docs` generates the documentation for the SDK.
