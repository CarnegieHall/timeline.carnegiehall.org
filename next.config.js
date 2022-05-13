const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          runtimeCaching,
          buildExcludes: [/middleware-manifest\.json$/],
          disable: process.env.NODE_ENV === 'development'
        }
      }
    ],
    [withBundleAnalyzer]
  ],
  {
    staticPageGenerationTimeout: 300,
    typescript: {
      ignoreBuildErrors: true
    },
    async redirects() {
      return [
        {
          source: '/about',
          destination: '/?menu=about',
          permanent: false
        },
        {
          source: '/explore',
          destination: '/?menu=index',
          permanent: false
        }
      ];
    },
    webpack: (config) => {
      // Add SVGR support
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      });

      return config;
    }
  }
);
