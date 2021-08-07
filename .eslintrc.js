module.exports = {
  root: true,
  env: {
    node: false,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    // 'prettier',
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  // watch this for explaining why some of this is here
  // https://www.youtube.com/watch?time_continue=239&v=YIvjKId9m2c
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'prettier/prettier': [
      'error',
      {
        // trailingComma: 'all',
        // singleQuote: true,
        // printWidth: 80,
      },
    ],
  },
};
