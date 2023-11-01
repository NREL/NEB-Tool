# NEB Tool Contributing Guidelines

## Getting Started

These contributing guidelines should be read by software developers wishing to contribute code or
documentation changes into NEB Tool, or to push changes upstream to the main NREL/NEB-Tool repository.

## Issue Tracking

New feature requests, changes, enhancements, and bug reports can be filed
as new issues in the [Github.com issue tracker](https://github.com/NREL/NEB-Tool/issues).
Please be sure to fully describe the issue.

### Issue Submission Checklist

1. Search the [issue tracker](https://github.com/NREL/NEB-Tool/issues) to see if your issue already exists. If so, please make a comment there or add a reaction to the issue.

2. Is this an individual bug report or feature request?
3. Can the bug or new feature be easily reproduced?
   1. Be sure to include enough details about your setup and the issue you've encountered
   2. Simplify as much of the process as possible to better isolate the problem.

## Repository Layout

The NEB-Tool repository is hosted on Github, and located here: http://github.com/NREL/NEB-Tool

This repository is organized using a modified git-flow system. Branches are organized as follows:

- main: Stable release version. Must have good test coverage and may not have all the newest features.
- develop: Development branch which contains the newest features. Tests must pass, but code may be unstable.
- issue-xxx[-description]: Feature or bug fix branch from develop, should reference a github issue number. You may provide an optional short description in the branch name.
- fix-xxx[-description]: Bug fix branch from main, should reference a github issue number. You may provide an optional short description in the branch name.

For external developers, please create a fork of NEB-Tool in your own account.
Internal developers may choose to work on issue and fix branches directly in the NREL/NEB-Tool repo.
Be sure to periodically synchronize the upstream develop branch into your feature branch to avoid conflicts in the pull request.

## Pull Requests

Pull requests must be made for all changes. Most pull requests should be made against the develop
branch unless patching a bug that needs to be addressed immediately, and only core developers should
make pull requests to the main branch.

All pull requests, regardless of the base branch, must include updated documentation and pass all
tests. In addition, code coverage should not be negatively affected.

When your branch is ready, make a pull request to the develop branch of NREL/NEB-Tool through the
[GitHub web interface](https://github.com/NREL/OpenOA/pulls). Pull requests must reference an issue number. If an issue does not yet exist, please create one.

When submitting a pull request, you
will need to accept the Contributor License Agreement(CLA) (This is TBD - See [Issue #8](https://github.com/NREL/NEB-Tool/issues/8)).

### Scope

Encapsulate the changes of one issue, or multiple if they are highly related. Three small pull
requests is greatly preferred over one large pull request. Not only will the review process be
shorter, but the review will be more focused and of higher quality, benefitting the author and code
base. Be sure to write a complete description of these changes in the pull request body.

## Tests

All tests must pass. Pull requests will be rejected or have changes requested if tests do not pass,
or cannot pass with changes. Tests are automatically run through Github Actions for any pull request
or push to the main or develop branches, but should also be run locally before submission.

All code changes should be paired with a corresponding unit or integration test. A description of how to run tests using Karma is provided in the [Readme](README.md).

### Test Automation

TBD

### Test Coverage

TBD

## Documentation

TBD

### Changelog

All changes must be documented appropriately in the pull request body on Github. The core developers will aggregate the descriptions in the pull request body into releases.

## Coding Style

TBD

## Release Process

TBD

### Versioning

NEB-Tool uses [semantic verisoning 2.0.0](https://semver.org/spec/v2.0.0.html). An example version specification for NEB-Tool looks like `0.0.1-alpha`

The following is reproduced from semver.org:
```
Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes
MINOR version when you add functionality in a backward compatible manner
PATCH version when you make backward compatible bug fixes
Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.
```