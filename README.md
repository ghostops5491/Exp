#  jonnyOnItCustomer
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:
1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!
# jonnyonit-customer

### TestFairy Release
1. `npm run clean:android-bundle`
2. `npm run clean:android`
3. `npm run android:build`
4. Go to `android/app/build/outputs/apk/release`
5. Drag and drop file `app-release.apk` into TestFairy dashboard

### Production Release to Google Play Store
1. Go to `android/app/build.gradle`
2. Update `versionCode`
3. Open `android/` dir in Android Studio
4. `Build` project
5. From toolbar go to `Build > Generate Signed APK...`
6. Select `Module` `app` and click `Next`
7. `Choose existing...` key store path under `$appRoot/android/app/joi-customer.jks`
8. Enter key store password, alias, and key password stored in `$appRoot/android/keystore.properties`, and select `Next`
9. Select both `V1` and `V2` signatures
10. Click `Finish`
11. Go to `$appRoot/android/build/outputs/apk/release` and select the release APK to drag and drop into Google Play Dashboard submission page for production release of application
(Take note that Android Studio builds the APK in the `android` directory while the `gradlew` CLI for the TestFairy releases builds it into the `android/app` directory)
