const { withProjectBuildGradle } = require("expo/config-plugins");

module.exports = function withAndroidxCoreFix(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.contents.includes("force 'androidx.core:core:")) {
      return config;
    }

    config.modResults.contents = config.modResults.contents.replace(
      /allprojects\s*\{/,
      `allprojects {
    configurations.all {
        resolutionStrategy {
            force 'androidx.core:core:1.13.1'
            force 'androidx.core:core-ktx:1.13.1'
        }
    }`
    );

    return config;
  });
};
