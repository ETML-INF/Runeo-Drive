# Builder et publier l'app mobile Runeo-drive

## iOS

- [Apple Developer Program](https://developer.apple.com/account) (Abonnement annuel) ➡ personnel XCL (adresse pro @gmail)
  - Signer les apps iOS
  - Distribuer sur l’App Store
  - Gérer certificats et profils de provisioning

- [App Store Connect](https://appstoreconnect.apple.com/) ➡ compte personnel XCL
  - Créer la fiche de l’app (nom, description, screenshots)
  - Gérer les versions
  - Soumettre à la review
  - Consulter crash reports, analytics, TestFlight

Flux iOS
1.	Expo génère le build iOS (.ipa)
2.	Le build est signé avec le compte Apple Developer
3.	Upload vers App Store Connect (automatique via Expo ou Transporter)
4.	Review Apple → publication manuelle ou automatique

## Android

- Compte développeur Android (Google Play Developers) ➡ [personnel "pro" XCL](https://play.google.com/console/u/0/developers/5143652919026592760/account)
  - Publier sur le Play Store.
  - Inclus dans Play Console

- Google Play Console
  - Créer l’app
  - Gérer les tracks (internal, closed, open, production)
  - Publier des versions
  - Voir stats, ANR, crashs

Flux Android
  - Expo génère un AAB (.aab)
  - Upload sur Play Console
  - Validation automatique + éventuelle review
  - Publication

## Expo

- [Compte Expo](https://expo.dev/settings) ➡ compte ETML-inf
  - EAS Build (cloud build iOS / Android)
  - EAS Submit (envoi vers Apple & Google)
- Dans un terminal:
  ```
  npx expo install eas-cli
  npx eas build -p android --profile preview
  npx eas build -p ios
  ```
