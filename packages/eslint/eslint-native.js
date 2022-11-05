/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-native"],
  rules: {
    ...require("./eslint-base-rules"),
    "react/jsx-key": "off",
  },
  ignorePatterns: [
    "**/*.js",
    "**/*.json",
    "node_modules",
    "public",
    "styles",
    ".next",
    "coverage",
    "dist",
    ".turbo",
  ],
};
