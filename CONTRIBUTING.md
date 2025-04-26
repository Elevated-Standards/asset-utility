# Contributing to Asset Utility

We love your input! We want to make contributing to Asset Utility as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any Contributions You Make Will Be Under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report Bugs Using GitHub's [Issue Tracker](https://github.com/yourusername/asset-utility/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/asset-utility/issues/new); it's that easy!

## Write Bug Reports With Detail, Background, and Sample Code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Use a Consistent Coding Style

* 2 spaces for indentation rather than tabs
* You can try running `npm run lint` for style unification

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## Getting Started

1. Create your own fork of the code
2. Clone the fork
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a working branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Testing

We use Jest for testing. All new code should include tests. Run tests with:

```bash
npm test
```

### Testing Guidelines

1. Write tests before implementing features (TDD approach preferred)
2. Each service method should have its own describe block
3. Test both success and error cases
4. Mock external dependencies

Example test structure:

```typescript
describe('ServiceName', () => {
  describe('methodName', () => {
    it('should handle successful case', () => {
      // test code
    });

    it('should handle error case', () => {
      // test code
    });
  });
});
```

## Documentation

Update documentation when making changes:

1. Update JSDoc comments for changed methods
2. Update the README.md if adding new features
3. Add usage examples in docs/recipes if appropriate
4. Update API.md for interface changes

## Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the API.md with any new or changed endpoints/methods
3. Update the version number in package.json following [SemVer](http://semver.org/)
4. The PR will be merged once you have the sign-off of two other developers

## Code Review Process

The core team looks at Pull Requests on a regular basis. After feedback has been given we expect responses within two weeks. After two weeks we may close the PR if it isn't showing any activity.

## Community

Discussions about the Open Source project take place on this repository's [Issues](https://github.com/yourusername/asset-utility/issues) and [Pull Requests](https://github.com/yourusername/asset-utility/pulls) sections. Anybody is welcome to join these conversations.

## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md).