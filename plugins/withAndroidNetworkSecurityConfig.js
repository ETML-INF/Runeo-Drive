const { withAndroidManifest, withDangerousMod } = require("expo/config-plugins");
const fs = require("fs");
const path = require("path");

// Sectigo Public Server Authentication CA DV R36 (intermediate for runeo.paleo.ch).
// Some Android devices ship with a system trust store that hasn't been updated with
// this CA yet, so it's bundled directly in the app as an extra trust anchor.
const CERT_RAW_NAME = "sectigo_r36";
const CERT_SOURCE = path.resolve(__dirname, "certs", `${CERT_RAW_NAME}.pem`);

const NETWORK_SECURITY_CONFIG = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="@raw/${CERT_RAW_NAME}"/>
            <certificates src="system"/>
        </trust-anchors>
    </base-config>
</network-security-config>
`;

function addResourceFiles(config) {
  return withDangerousMod(config, [
    "android",
    (config) => {
      const resDir = path.join(config.modRequest.platformProjectRoot, "app", "src", "main", "res");
      const rawDir = path.join(resDir, "raw");
      const xmlDir = path.join(resDir, "xml");
      fs.mkdirSync(rawDir, { recursive: true });
      fs.mkdirSync(xmlDir, { recursive: true });

      fs.copyFileSync(CERT_SOURCE, path.join(rawDir, `${CERT_RAW_NAME}.pem`));
      fs.writeFileSync(path.join(xmlDir, "network_security_config.xml"), NETWORK_SECURITY_CONFIG);

      return config;
    },
  ]);
}

function setManifestAttribute(config) {
  return withAndroidManifest(config, (config) => {
    const application = config.modResults.manifest.application[0];
    application.$["android:networkSecurityConfig"] = "@xml/network_security_config";
    return config;
  });
}

module.exports = function withAndroidNetworkSecurityConfig(config) {
  config = addResourceFiles(config);
  config = setManifestAttribute(config);
  return config;
};
