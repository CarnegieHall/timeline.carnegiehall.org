import path from 'path';

const CONFIG = {
  stories: ['../**/*.stories.@(ts|tsx|mdx)'],
  webpack: {
    rules: [
      {
        removeMatch: '.svg',
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      }
    ]
  }
};

module.exports = {
  stories: CONFIG.stories,
  addons: [
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true }
    },
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  reactOptions: {
    fastRefresh: true
  },
  webpackFinal: async (config: any) => {
    const findRule = (ext: string) => {
      return config.module.rules.find((rule: RegExp) => {
        return rule.test?.toString().includes(ext.replace('.', ''));
      });
    };

    // Add new rules
    CONFIG.webpack.rules.forEach((rule: any) => {
      if (rule.removeMatch) {
        findRule(rule.removeMatch).exclude = rule.test;
        delete rule.removeMatch;
      }
      config.module.rules.push(rule);
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      $src: path.resolve(__dirname, '../src/'),
      $types: path.resolve(__dirname, '../@types/'),
      $storybook: path.resolve(__dirname, '../.storybook/')
    };

    return config;
  }
};
