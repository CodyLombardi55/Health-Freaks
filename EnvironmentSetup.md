1. After cloning repo into vscode, rename current "HealthFreaks" folder to anything else
2. Open new terminal and run command: npx create-expo-app HealthFreaks
3. Right click new "HealthFreaks" folder and open integrated terminal
4. Run command: npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config@^19.0.0
    - this enables the web simulator
5. Run the following commands (still inside integrated terminal):
    - npx expo install @react-native-async-storage/async-storage
    - npx expo install react-native-screens react-native-safe-area-context
    - npx expo install expo-font
    - npm install @react-navigation/native
    - npm install @react-navigation/bottom-tabs
    - npm install @react-navigation/native-stack
    - npx expo install firebase
6. Move the following folders from original (renamed in step 1) into new "HealthFreaks" folder. When prompted to update imports, make sure to press "No" in the popup:
    - FireBaseConfig.js
    - App.tsx
    - app (folder)
    - assets (folder)
7. It is now safe to run: npx expo start
    - If prompted to install typescript support, press "y" in terminal