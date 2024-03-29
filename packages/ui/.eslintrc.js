module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  ignorePatterns: [".eslintrc.js", "jest.config.js", "**/vendor/*.js"],
  rules: {
    "react/prop-types": [0, {}],
    "react/react-in-jsx-scope": "off",
    "no-control-regex": "off",
  },
}
