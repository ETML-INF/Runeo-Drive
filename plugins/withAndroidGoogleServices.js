const { withProjectBuildGradle, withAppBuildGradle, withDangerousMod } = require("expo/config-plugins");
const fs = require("fs");
const path = require("path");

function addGoogleServicesClasspath(config) {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.contents.includes("com.google.gms:google-services")) {
      return config;
    }
    config.modResults.contents = config.modResults.contents.replace(
      /classpath\('com\.facebook\.react:react-native-gradle-plugin'\)/,
      `classpath('com.facebook.react:react-native-gradle-plugin')
    classpath('com.google.gms:google-services:4.4.2')`
    );
    return config;
  });
}

function applyGoogleServicesPlugin(config) {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.contents.includes("com.google.gms.google-services")) {
      return config;
    }
    config.modResults.contents =
      `apply plugin: 'com.google.gms.google-services'\n` +
      config.modResults.contents;
    return config;
  });
}

function copyGoogleServicesJson(config) {
  return withDangerousMod(config, [
    "android",
    (config) => {
      const src = path.resolve(config.modRequest.projectRoot, "google-services.json");
      const dest = path.resolve(config.modRequest.platformProjectRoot, "app", "google-services.json");
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
      return config;
    },
  ]);
}

module.exports = function withAndroidGoogleServices(config) {
  config = addGoogleServicesClasspath(config);
  config = applyGoogleServicesPlugin(config);
  config = copyGoogleServicesJson(config);
  return config;
};
