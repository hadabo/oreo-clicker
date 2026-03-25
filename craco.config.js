module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove source-map-loader from all rules
      webpackConfig.module.rules = webpackConfig.module.rules.filter(
        rule => !rule.enforce || rule.enforce !== 'pre'
      );
      return webpackConfig;
    }
  }
};
