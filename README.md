# Instructions to run the App
Ios:
```

cd ios
sudo gem install cocoapods
pod setup
pod init
open -a Xcode Podfile
# pod 'AFNetworking', '0.9.1' # optional
pod install

open -a "/Applications/Xcode.app" *.xcworkspace
Click Product > Build 



react-native run-ios

==============
Troubleshooting:

If the following occurs, In Xcode, open app.xcodeproj > "Build Phases" > "Copy Bundle Resources" and delete all ttf files that are mentioned in "Copy Pods Resources".

Multiple commands produce '/Users/botla/Library/Developer/Xcode/DerivedData/app-atdvbfelefnmxhgsuhgtasehqhui/Build/Products/Debug-iphonesimulator/ClaimsBot.app/Zocial.ttf':
1) Target 'app' (project 'app') has copy command from '/Users/botla/apps/claims-chatbot-app/node_modules/react-native-vector-icons/Fonts/Zocial.ttf' to '/Users/botla/Library/Developer/Xcode/DerivedData/app-atdvbfelefnmxhgsuhgtasehqhui/Build/Products/Debug-iphonesimulator/ClaimsBot.app/Zocial.ttf'
2) That command depends on command in Target 'app' (project 'app'): script phase “[CP] Copy Pods Resources”




==============
open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/
npm install -g ios-sim
ios-sim start --devicetypeid "iPhone-6, 10.3"

alias ios-simulator="open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/"




pod setup --verbose
pod init
open -a Xcode Podfile




```

Android:
```
emulator -list-avds
emulator -avd pxl
react-native run-android --deviceId emulator-5554

```