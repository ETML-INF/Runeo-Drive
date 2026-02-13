const { withDangerousMod } = require("expo/config-plugins");
const fs = require("fs");
const path = require("path");

module.exports = function withSimulatorMacroFix(config) {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );
      let podfile = fs.readFileSync(podfilePath, "utf-8");

      const marker = "# withSimulatorMacroFix";

      if (!podfile.includes(marker)) {
        const fixSnippet = `
    ${marker}
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        cflags = build_config.build_settings['OTHER_CFLAGS']
        if cflags.is_a?(String)
          build_config.build_settings['OTHER_CFLAGS'] = [cflags, '-Wno-macro-redefined']
        elsif cflags.is_a?(Array)
          build_config.build_settings['OTHER_CFLAGS'] = cflags + ['-Wno-macro-redefined']
        else
          build_config.build_settings['OTHER_CFLAGS'] = ['$(inherited)', '-Wno-macro-redefined']
        end
      end
    end`;

        if (podfile.includes("post_install do |installer|")) {
          podfile = podfile.replace(
            /post_install do \|installer\|/,
            `post_install do |installer|${fixSnippet}`
          );
        } else {
          const lastEndIndex = podfile.lastIndexOf("end");
          podfile =
            podfile.slice(0, lastEndIndex) +
            `\n  post_install do |installer|${fixSnippet}\n  end\n` +
            podfile.slice(lastEndIndex);
        }
        fs.writeFileSync(podfilePath, podfile);
      }

      return config;
    },
  ]);
};
