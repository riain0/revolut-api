module.exports = {
  linters: {
    '*.+(js|jsx|ts|tsx)': ['tslint'],
    '*.+(js|jsx|ts|tsx|json|yml|yaml|css|less|scss|md|mdx|graphql)': [
      'prettier --write',
      'git add',
    ],
  },
};
