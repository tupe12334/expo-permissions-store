# Contributing to expo-permissions-store

Thank you for your interest in contributing! This document provides guidelines and steps for contributing.

## Development Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/expo-permissions-store.git
cd expo-permissions-store
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development build:

```bash
pnpm dev
```

## Available Scripts

| Script              | Description                  |
| ------------------- | ---------------------------- |
| `pnpm build`        | Build the package            |
| `pnpm dev`          | Watch mode for development   |
| `pnpm lint`         | Run ESLint                   |
| `pnpm lint:fix`     | Fix ESLint issues            |
| `pnpm format`       | Format code with Prettier    |
| `pnpm format:check` | Check code formatting        |
| `pnpm typecheck`    | Run TypeScript type checking |
| `pnpm test`         | Run tests                    |
| `pnpm spell`        | Check spelling               |

## Making Changes

1. Create a new branch from `main`:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and ensure:
   - Code passes linting (`pnpm lint`)
   - Code is properly formatted (`pnpm format`)
   - TypeScript compiles without errors (`pnpm typecheck`)
   - Tests pass (`pnpm test`)

3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve issue with X"
git commit -m "docs: update README"
```

## Commit Message Format

We use Conventional Commits. Each commit message should be structured as:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Pull Requests

1. Push your branch to your fork
2. Open a Pull Request against the `main` branch
3. Fill out the PR template with:
   - Description of changes
   - Related issues
   - Testing performed
4. Wait for review and address any feedback

## Code Style

- Use TypeScript for all source code
- Follow the existing code patterns
- Keep functions small and focused
- Add JSDoc comments for public APIs

## Reporting Issues

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Relevant code snippets or error messages

## Questions?

Feel free to open an issue for any questions or discussions.
