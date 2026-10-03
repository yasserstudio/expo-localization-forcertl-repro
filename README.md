# expo-localization resets `I18nManager.forceRTL` on every launch (SDK 58)

Blank `create-expo-app --template blank@next` app (expo 58.0.3, react-native 0.88.0-rc.3) with
`expo-localization` installed and **no plugin options**. `App.js` has one button that calls
`I18nManager.allowRTL(true)`, `I18nManager.forceRTL(true)` and `reloadAppAsync()`, and a label
showing `I18nManager.isRTL`.

## Steps

```sh
npm install
npx expo run:android --variant release   # or run:ios
```

1. Launch: label reads `isRTL=false`.
2. Tap **Force RTL and reload**.
3. After the reload — and after force-stopping and reopening — the label still reads `isRTL=false`.

Expected: `isRTL=true` after step 2, as it is with `expo-localization` removed
(`npm uninstall expo-localization`, drop the plugin, `npx expo prebuild --clean`): same app, same
emulator, `false` → `true` → `true`.

## Cause

`LocalizationModule` (Android `setRTLFromStringResources`, iOS `setRTLPreferences`) now calls
`allowRTL(supportsRTL ?? true)` and `forceRTL(forcesRTL ?? false)` on every module creation
(expo/expo#48086). With no plugin options the values are unset, so `forceRTL(false)` is written
before React reads the constants, overwriting the app's runtime `I18nManager.forceRTL(true)`.
In SDK 57 an unset value was a no-op.
