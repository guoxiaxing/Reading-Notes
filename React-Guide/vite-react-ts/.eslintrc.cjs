const { mkdReactConfig } = require('@monkey-design/eslint-config-mkd-react');
const config = mkdReactConfig({ project: ['./tsconfig.json'] });

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': ['off'],
        'react/require-default-props': ['off'],
        'react/jsx-props-no-spreading': ['off'],
        'jsx-a11y/click-events-have-key-events': ['off'],
        'jsx-a11y/interactive-supports-focus': ['off'],
        "import/no-absolute-path": [2,
          {
            "ignore": ["/@/"]
          }
        ]
      },
    },
  ],
};

