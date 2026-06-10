# Builder et publier l'app mobile Runeo-drive

Les détails sont ci-dessous. Mais les informations capital pour pouvoir t'en sortir avec l'aide de l'IA sont celle-ci :
- le compte Apple Développeur est mon compte personnel liés à mon adresse Gmail professionnelle. Team François-Xavier Frédéric* Carrel* (9NQ69T686N)
- Pareil pour le compte App Store Connect
- Le compte expo par contre est lié à l'e-mail de la section informatique de l'ETML
- L'application s'appelle désormais RuneoDriver. Son identifiant de bundle Apple ou package Android est `ch.mosiby.runeodriver`

## Valider 

En CLI, à la racine du repo: `npx expo start`

## iOS

- [Apple Developer Program](https://developer.apple.com/account) (Abonnement annuel) ➡ personnel XCL (adresse pro @gmail)
  - Signer les apps iOS
  - Distribuer sur l’App Store
  - Gérer certificats et profils de provisioning

- [App Store Connect](https://appstoreconnect.apple.com/) ➡ compte personnel XCL (adresse pro @gmail)
  - Créer la fiche de l’app (nom, description, screenshots)
  - Gérer les versions
  - Soumettre à la review
  - Consulter crash reports, analytics, TestFlight

Flux iOS
1.	Expo génère le build iOS (.ipa)
2.	Le build est signé avec le compte Apple Developer
3.	Upload vers App Store Connect (`eas submit -p ios --latest`)
4.	Review Apple → publication manuelle ou automatique

J'ai configuré un compte sur la Prod Paleo pour qu'Apple puisse venir faire leur validation. Les credentials sont : 

`runeotest@apple.com / ae4e20ba64f111a3be58a5d207de27bf`

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

# Story: le build de 2026

Je continue à avoir des conflits entre les divers comptes, ainsi que les noms de bundle.

Y'en a marre, je vais renommer l'application et recommencer clean sur les deux platesformes.

À partir de maintenant, l'application s'appelle RuneoDriver et son bundle est `ch.mosiby.runeodriver`

## Expo

- Je crée un [projet](https://expo.dev/accounts/etml-inf-dev/projects/runeodriver) sur Expo

## Apple

- Je crée un [AppID](https://developer.apple.com/account/resources/identifiers/bundleId/edit/LX3S3RL7FM) avec le bundle `ch.mosiby.runeodriver`
- Je crée une [Application](https://appstoreconnect.apple.com/apps/6770265232/distribution/ios/version/inflight) dans App Store Connect 
### Build
```
~/Github/Runeo-Drive: eas build -p ios --profile production
✔ Using remote iOS credentials (Expo server)
✔ Do you want to log in to your Apple account? … yes

› Log in to your Apple Developer account to continue
✔ Apple ID: … xavier.carrel.pro@gmail.com
› Restoring session /Users/Xavier/.app-store/auth/xavier.carrel.pro@gmail.com/cookie
› Session expired Local session
(node:92281) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
› Using password for xavier.carrel.pro@gmail.com from your local Keychain
✔ Logged in New session
› Team François-Xavier Frédéric* Carrel* (9NQ69T686N)
› Provider Francois-Xavier Frederic* Carrel* (126457319)
✔ Bundle identifier registered ch.mosiby.runeodriver
✔ Synced capabilities: No updates
✔ Synced capability identifiers: No updates
✔ Fetched Apple distribution certificates
✔ Reuse this distribution certificate?
Cert ID: QD3SHUPS2N, Serial number: 6922F8643FB1B8474F7BE6A0D788CF21, Team ID: 9NQ69T686N, Team name: François-Xavier Frédéric* Carrel* (Individual)
    Created: 3 months ago, Updated: 3 months ago,
    Expires: Sat, 13 Feb 2027 10:28:49 GMT+0100
    📲 Used by: @etml-inf-dev/runeodrive … yes
Using distribution certificate with serial number 6922F8643FB1B8474F7BE6A0D788CF21
✔ Generate a new Apple Provisioning Profile? … yes
✔ Created Apple provisioning profile
✔ Created provisioning profile

Project Credentials Configuration

Project                   @etml-inf-dev/runeodriver
Bundle Identifier         ch.mosiby.runeodriver
                          
App Store Configuration   
                          
Distribution Certificate  
Serial Number             6922F8643FB1B8474F7BE6A0D788CF21
Expiration Date           Sat, 13 Feb 2027 10:28:49 GMT+0100
Apple Team                9NQ69T686N (François-Xavier Frédéric* Carrel* (Individual))
Updated                   3 months ago
                          
Provisioning Profile      
Developer Portal ID       6J4B5632YA
Status                    active
Expiration                Sat, 13 Feb 2027 10:28:49 GMT+0100
Apple Team                9NQ69T686N (François-Xavier Frédéric* Carrel* (Individual))
Updated                   1 second ago
                          
All credentials are ready to build @etml-inf-dev/runeodriver (ch.mosiby.runeodriver)


Compressing project files and uploading to EAS Build. Learn more: https://expo.fyi/eas-build-archive
✔ Compressed project files 1s (24.5 MB)
✔ Uploaded to EAS 3s

See logs: https://expo.dev/accounts/etml-inf-dev/projects/runeodriver/builds/f1a72a73-ee67-4558-88fd-bf6d68c1c68b

Waiting for build to complete. You can press Ctrl+C to exit.
✔ Build finished

🍏 iOS app:
https://expo.dev/artifacts/eas/vQJUJx7sGL4HSCE1NZeHHD.ipa

```

### Submit

## Android

- Compte développeur Android (Google Play Developers) ➡ [personnel "pro" XCL](https://play.google.com/console/u/0/developers/5143652919026592760/account)
  - Publier sur le Play Store.
  - Inclus dans Play Console

- Il faut une clé de compte de service dans un projet Google Cloud. Je crée le projet [ici](https://console.cloud.google.com/iam-admin/settings?project=runeodriver). Je crée dedans le [compte de service](https://console.cloud.google.com/iam-admin/serviceaccounts?project=runeodriver). 

- finalement, il semble que le compte de service ne soit pas indispensable et que je peux charger mon fichier à la main. C'est ce que j'essaye de faire.
-  Je peux charger un premier fichier .aab pour les tests Interne, ensuite je veux le promouvoir, il me demande de uploadet un fichier aab j'essaye le même mais il le refuse parce que c'est le même fichier et je modifie juste le numéro de version pour voir.
-   Grosse galère pour arriver à recompiler le code. La mise à jour EAS SDK (51-55) a visiblement causé des gros problèmes de compatibilité.

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

- Je crée une [Application](https://play.google.com/console/u/0/developers/5143652919026592760/app/4973564979851516873/app-dashboard) dans PlayConsole

### Build

```
~/Github/Runeo-Drive: eas build -p android --profile production
✔ Using remote Android credentials (Expo server)
✔ Generate a new Android Keystore? … yes
✔ Created keystore

Compressing project files and uploading to EAS Build. Learn more: https://expo.fyi/eas-build-archive
✔ Compressed project files 1s (24.5 MB)
✔ Uploaded to EAS 3s

See logs: https://expo.dev/accounts/etml-inf-dev/projects/runeodriver/builds/d4a45bb0-22d3-4d88-b45b-950bdd07d643

Waiting for build to complete. You can press Ctrl+C to exit.
✔ Build finished

🤖 Android app:
https://expo.dev/artifacts/eas/sfXHUwhGQ5LodnbdF15498.aab

```
Deuxième build (202621): https://expo.dev/artifacts/eas/hVuzu5ykNZNfjkCdCMgkHV.aab