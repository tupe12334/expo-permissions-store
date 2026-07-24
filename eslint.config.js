import eslintConfigAgent from "eslint-config-agent";

export default [
  {
    // Intentionally-disabled tests (the `.skip.ts` suffix keeps them out of the
    // test run) and config files live outside any tsconfig project, so the
    // type-aware rules cannot resolve them. Ignore them rather than widening the
    // project (this also keeps `eslint --fix` working when lint-staged passes
    // these files directly on commit).
    ignores: ["**/*.skip.ts", "**/*.config.{js,ts,mjs,cjs}"],
  },
  ...eslintConfigAgent,
  {
    rules: {
      // Require strict equality (===/!==) to avoid type-coercion bugs
      eqeqeq: ["error", "always"],
      // Library exports multiple types/functions from single files
      "single-export/single-export": "off",
      // Don't require spec files for library code
      "ddd/require-spec-file": "off",
      // Allow type assertions for dynamic module loading
      "no-restricted-syntax": "off",
      // Allow generic errors for module-not-installed scenarios
      "error/no-generic-error": "off",
      "error/require-custom-error": "off",
      "error/no-literal-error-message": "off",
      // Allow default parameters
      "default/no-default-params": "off",
      // Disable import/order due to resolver issues with TypeScript
      "import/order": "off",
      // Allow type aliases (not just interfaces)
      "@typescript-eslint/consistent-type-definitions": "off",
      // Enforce `import type` for type-only imports. With isolatedModules +
      // bundler resolution this guarantees correct type elision and prevents
      // accidental runtime imports of type-only symbols.
      // disallowTypeAnnotations stays off: inline `import("...")` type
      // annotations are required by the optional-module `safeRequire` pattern.
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      // Library handlers can be longer than typical functions
      "max-lines-per-function": "off",
      "max-lines": "off",
    },
  },
  {
    // Rules newly added to eslint-config-agent between v1.9.3 and v3.0.4. The
    // codebase was green on the previous major, so these are surfaced as
    // warnings to allow an incremental burn-down rather than blocking CI on the
    // version bump. Promote any of these back to "error" once its backlog is
    // cleared.
    rules: {
      "switch-case/no-case-curly": "warn",
      "switch-case/newline-between-switch-case": "warn",
      // Fires on RTK store methods and mocked spies that are never re-bound.
      "@typescript-eslint/unbound-method": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/no-confusing-void-expression": "warn",
      "jsdoc/require-jsdoc": "warn",
      "jsdoc/require-returns": "warn",
      "jsdoc/require-param": "warn",
    },
  },
];
