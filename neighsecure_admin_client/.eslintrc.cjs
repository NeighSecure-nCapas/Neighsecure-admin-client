module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "curly": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "no-multi-spaces": "error",
    "comma-dangle": ["error", "never"],
  },
}
