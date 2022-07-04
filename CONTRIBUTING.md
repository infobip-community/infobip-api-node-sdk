# Contributing to the Infobip Node.js SDK

✨✨ First off, thanks for taking the time to contribute! ✨✨

Infobip community projects adhere to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md). By participating,
you are expected to uphold our code of conduct.

This document provides a set of best practices for open source contributions to Infobip's Node.js SDK - bug reports, code submissions / pull requests, etc. Naturally, this document is open source, and we encourage feedback & suggestions for improvement via GitHub issues and pull requests.

## 🚩 Issues

Bugs are tracked as [GitHub issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues). Open an issue in this repository and provide as much information as possible in the description box.

Clearly outline the problem and include any additional details that could help maintainers reproduce your problem:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as much detail as needed.
- **Provide specific examples to demonstrate the steps**.
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why.**
- **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

### 📇 Enhancement Requests

We also accept requests to improve the SDK. Please use a GitHub issue, and describe the feature you'd like added to the SDK, the reasoning behind the request, and the impact this would have on your usage of the SDK.

## ℹ️ Asking for General Help

The [Infobip website](https://www.infobip.com/docs/api) has a list of resources for getting programming help and more.
For any question, contributors are available at [DevRel@infobip.com](mailto:DevRel@infobip.com).
Please use the issue tracker for bugs only!

## ⬇️ Contributing Code

Once you've found an issue you'd like to work on, please follow these steps to make your contribution:
- comment on it and say you're working on that issue. This is to avoid conflicts with others also working on the issue.
- write your code and submit your pull request. Be sure to read and follow our pull request guidelines!
- wait for code review and address any issues raised as soon as you can.

Please familiarize yourself with the [maintainer guide](MAINTENANCE.md) for specific instructions on how to run, test, and lint the code.

Submit all changes directly to the `main` branch. We don't use separate branches for development or for upcoming releases. We do our best to keep `main` in good shape, with all tests passing.

Code that lands in `main` must be compatible with the latest stable release and Node.js v14.

Before opening a pull request, please run through the following checklist:
- make sure you're contributing code from your own fork
- make sure you've bumped the version number
- make sure the project still builds
- make sure you've run the linter on your code
- make sure you've updated the tests and maintained 100% test coverage

### ⚠️ Breaking Changes

When the pull request has the breaking change, the first line of the PR should be BREAKING CHANGE. Code containing breaking changes should not land on `main` until a major release is cut. We should be able to release a new minor version from the tip of `main` at any time.

### 📬 Opening the Pull Request

After you've opened the PR, add @juliacodez and @dlozina as reviewers. Your PR may be delayed in being reviewed and merged as the maintainers seek more information or clarify ambiguities.


## 📚 Further Reading

For more in-depth guides on developing the SDK, check the [maintainance guide](MAINTENANCE.md) and the [Infobip API Reference](https://www.infobip.com/docs/api#channels).
