# Simulator instructions

## On Computer
1. After cloning repo into vscode, rename existing "**HealthFreaks**" folder to anything else (will be deleted later on)
2. Open new terminal (using button on top bar), then run command: `npx create-expo-app HealthFreaks`
3. Close current terminal (either press the trash-can icon or press "ctrl+d")
4. Right click new "**HealthFreaks**" folder and select "**open integrated terminal**"
5. Run command: npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config@^19.0.0
    - this enables the web simulator
    - newer versions of these may exist since the time this guide was made, so install those instead if so
6. Run the following commands (still inside integrated terminal):
    - npx expo install @react-native-async-storage/async-storage
    - npx expo install react-native-screens react-native-safe-area-context expo-font firebase expo-sensors react-native-reanimated
    - npm install @react-navigation/native
    - npm install @react-navigation/bottom-tabs
    - npm install @react-navigation/native-stack
    - npm install react-native-stopwatch-timer react-native-blur react-native-circular-progress-indicator react-native-select-dropdown
7. Move the following folders from original (renamed in step 1) into new "HealthFreaks" folder. When prompted to overwrite, select **yes**. When prompted to update imports, press **no**:
    - FireBaseConfig.ts
    - App.tsx
    - app (folder)
    - assets (folder)
    - components (folder)
    - data (folder)
    - babel.config.js
8. It is now safe to run: `npx expo start`
    - If prompted to install typescript support, press "**y**" in terminal
9. To end session, press button combination shown in terminal
    - Should be `ctrl+c` by default

## Browser Simulator
1. Complete "On Computer" instructions before continuing
2. In VSCode terminal, press w
    - If prompted to install newer web packages (from step 5 above), install those
3. Your default web browser should launch, and a tab containing the simulator should load in a couple of seconds
    - If this does not happen, the terminal should contain a link for you to paste into a browser (essentially the manual method of the above step)
4. The app is currently designed for a mobile interface only, so you need to enable the responsive design mode of your browser
    - In Google Chrome and Firefox, the default shortcut is ctrl+shift+m
    - For other browsers, if the above does not work then just shrink the window size to mimic a phone screen
5. You may now use the web-based simulator

## On Mobile Device
1. Install "Expo Go" from AppStore (ios) or PlayStore (android)
2. Complete "On Computer" instructions before continuing
3. Follow appropriate instructions for device:
    - Android: Open Expo Go app and use built-in QR scanner
    - IOS: Open phone camera (or some other QR scanner)
4. Scan QR code shown in VSCode terminal
5. App should "install" temporarily and function as long as the session is running on the VSCode terminal

# Install Instructions

## Android
1. Coming soon