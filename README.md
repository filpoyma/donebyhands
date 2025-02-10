### donebyhand_app

npm i
npm run postinstall

для библиотек react-native-onesignal, react-native-yamap, react-native-config, react-native-geolocation-service и др.
требуется добавить namespace в build.gradle. namespace имя берется из соотв. из AndroidManifest.xml
напр. из - 
./node_modules/react-native-yamap/android/src/main/AndroidManifest.xml -> package="ru.vvdev.yamap"
добавляем строчку `namespace "ru.vvdev.yamap"` в обьект android в файле
./node_modules/react-native-yamap/android/src/build.gradle






