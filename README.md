# Runeo-Drive-2022

Runeo Drive is an app for the driver of the [Paléo festival](http://yeah.paleo.ch/) to let them interact with Runeo Desk
to coordinate their run from a phone.

## Installation

- Clone the repository `git clone https://github.com/CPNV-ES/Runeo-Drive-2022.git`
- Follow [the installation guide](https://reactnative.dev/docs/environment-setup) of Expo Cli start.
- Install [Runeo desk](https://github.com/CPNV-ES/Runeo-Desk-2020) to have a local development backend in case the online is down. Ask [XCL](https://github.com/XCarrel) for the access.

### Config

- [Node 12 or higher](https://nodejs.org/en/download/)
- Android emulator or a device with a physical screen
  - We used the [android studio emulator](https://developer.android.com/studio)
- iOS simulator or a device with a physical screen
- [Expo CLI](https://expo.io/cli/) for the build

## Run Project

1. Start Runeo Desk (if using local backend)
1. You may want to change the apiUrl for Runeo Desk in [App.tsx](App.tsx)
1. Finally, execute the command `expo start` to open a web page where you can choose to run the app from Android or iOS.

## Build the app for Android or iOS

To build the app for Android or iOS, we follow the [guide](https://docs.expo.dev/classic/building-standalone-apps/) of Expo Cli.

We resume it at the following steps:

1. Install the Expo CLI with `npm install -g expo-cli` (or `yarn global add expo-cli`)
1. Create an Expo account if you haven't one
1. Configure the app.json (already done, but still check it)
1. Finally to build the app for Android or iOS, execute the command `expo build:android -t apk` or `expo build:ios`.
