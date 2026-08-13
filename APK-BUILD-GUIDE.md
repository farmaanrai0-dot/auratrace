# AuraTrace Android APK Build Guide

## Overview
This guide will help you convert your AuraTrace website into an Android APK using Capacitor. This will create a mobile app with all your website features plus app-specific capabilities.

## Prerequisites

### Required Software
1. **Node.js** (already installed)
2. **Java JDK 11 or higher** - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/)
3. **Android Studio** - Download from [developer.android.com](https://developer.android.com/studio)
4. **Android SDK** - Installed via Android Studio

### Environment Setup
```bash
# Set JAVA_HOME environment variable
# Windows: System Properties -> Environment Variables
# JAVA_HOME = C:\Program Files\Java\jdk-11.x.x

# Set ANDROID_HOME environment variable
# ANDROID_HOME = C:\Users\Shadow\AppData\Local\Android\Sdk

# Add to PATH:
# %JAVA_HOME%\bin
# %ANDROID_HOME%\platform-tools
# %ANDROID_HOME%\tools
```

## Step 1: Install Capacitor Dependencies

```bash
cd c:/Users/Shadow/AuraTrace
npm install @capacitor/android @capacitor/cli @capacitor/core --save-dev
```

## Step 2: Initialize Capacitor

```bash
npx cap init AuraTrace com.auratrace.app
```

## Step 3: Add Android Platform

```bash
npx cap add android
```

## Step 4: Configure Capacitor

Create `capacitor.config.json`:
```json
{
  "appId": "com.auratrace.app",
  "appName": "AuraTrace",
  "webDir": ".",
  "server": {
    "url": "https://auratrace.co.uk",
    "cleartext": true
  },
  "android": {
    "buildOptions": {
      "keystorePath": "android-release.keystore",
      "keystoreAlias": "auratrace",
      "keystoreAliasPassword": "your_password",
      "keystorePassword": "your_password"
    }
  }
}
```

## Step 5: Create App Icons and Splash Screens

### Icon Requirements
- **Adaptive Icon**: 512x512px PNG
- **Foreground**: 512x512px PNG (transparent)
- **Background**: 512x512px PNG
- **Splash Screen**: 2732x2732px PNG

### Tool to Generate Icons
Use [Capacitor Assets](https://capacitorjs.com/docs/guides/splash-screens-and-icons) or online tools like:
- https://icon.kitchen/
- https://makeappicon.com/

Place icons in:
- `resources/icon.png`
- `resources/icon-foreground.png`
- `resources/icon-background.png`
- `resources/splash.png`

## Step 6: Sync and Build

```bash
# Sync web assets to Android
npm run app:sync

# Open Android Studio
npm run app:open
```

## Step 7: Build APK in Android Studio

1. Open Android Studio (it will open automatically from previous step)
2. Wait for Gradle sync to complete
3. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**
4. Select **debug** or **release** variant
5. APK will be generated in `android/app/build/outputs/apk/debug/`

## App-Specific Features to Add

### 1. Push Notifications
Add to `capacitor.config.json`:
```json
{
  "plugins": {
    "PushNotifications": {
      "presentationOptions": {
        "badge": true,
        "sound": true,
        "alert": true
      }
    }
  }
}
```

Install:
```bash
npm install @capacitor/push-notifications
npm install @capacitor/fcm
```

### 2. Offline Support
Add service worker registration in `index.html`:
```html
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
</script>
```

### 3. App Permissions
Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.VIBRATE" />
```

### 4. App Metadata
Update `android/app/src/main/AndroidManifest.xml`:
```xml
<application
    android:label="AuraTrace"
    android:icon="@mipmap/ic_launcher"
    android:theme="@style/AppTheme">
```

## Step 8: Generate Signed APK for Play Store

### Create Keystore
```bash
keytool -genkey -v -keystore android-release.keystore -alias auratrace -keyalg RSA -keysize 2048 -validity 10000
```

### Configure Signing in Android Studio
1. **Build > Generate Signed Bundle/APK**
2. Select **APK**
3. Choose your keystore file
4. Enter keystore password and alias
5. Select **release** build type
6. APK will be generated in `android/app/build/outputs/apk/release/`

## Play Store Submission Requirements

### Required Assets
- **App Icon**: 512x512px
- **Feature Graphic**: 1024x500px
- **Screenshots**: At least 2 screenshots (phone or 7-inch tablet)
- **Privacy Policy URL**: Required for apps handling personal data
- **Content Rating**: Complete content rating questionnaire

### App Listing Information
- **App Name**: AuraTrace
- **Short Description**: Premium herbal supplements & wellness
- **Full Description**: Detailed app description
- **Category**: Health & Fitness
- **Contact Details**: hello@auratrace.co.uk

## Web Download Distribution

For web distribution, you can:
1. Host the APK on your website
2. Create a download page with installation instructions
3. Add QR code for easy mobile scanning

## Troubleshooting

### Gradle Build Fails
- Check Android SDK installation
- Update Android Studio to latest version
- Clear Gradle cache: `cd android && ./gradlew clean`

### Capacitor Sync Issues
- Delete `android` folder and run `npx cap add android` again
- Check `capacitor.config.json` syntax

### APK Not Installing
- Enable "Install from Unknown Sources" on Android device
- Check if APK is signed correctly for release builds

## Next Steps

1. Install Android Studio and required SDKs
2. Generate app icons and splash screens
3. Run the initialization commands above
4. Test the debug APK on your device
5. Generate signed release APK for Play Store
6. Prepare Play Store listing assets
7. Submit to Google Play Console

## Alternative: PWA (Progressive Web App)

If APK build is too complex, consider making your website a PWA:
- Add manifest.json
- Add service worker
- Users can "Add to Home Screen" from browser
- Works across all platforms (Android, iOS, Desktop)

Would you like me to help with PWA setup instead, or proceed with Capacitor APK build?
