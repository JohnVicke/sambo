module.exports = {
  "arrow-body-style": ["error", "as-needed"],
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      vars: "all",
      args: "all",
      ignoreRestSiblings: false,
      varsIgnorePattern: "^_",
      argsIgnorePattern: "^_",
    },
  ],
  "prefer-const": "error",
  "turbo/no-undeclared-env-vars": "off",
};
