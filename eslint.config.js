import eslintConfigAgent from "eslint-config-agent";

export default [
  ...eslintConfigAgent,
  {
    rules: {
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
      // Library handlers can be longer than typical functions
      "max-lines-per-function": "off",
      "max-lines": "off",
    },
  },
  {
    // Test files have relaxed rules
    files: ["**/*.test.ts", "**/*.spec.ts"],
    rules: {},
  },
];
