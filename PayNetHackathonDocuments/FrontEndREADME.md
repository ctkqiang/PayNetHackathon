# PFM_PAYNET

## Overview

**PFM_PAYNET** is a project designed to address the **Personal Financial Management (PFM)** challenge, aiming to leverage access to various financial data (CASA, term deposits, credit cards, loans, etc.) to create more data-driven, customer-tailored financial solutions. This project uses [FVM](https://fvm.app) (Flutter Version Manager) to manage the Flutter SDK version, specifically **Flutter version 3.24.3**.

## Prerequisites

Before setting up the project, make sure you have the following tools installed:

- **FVM**: Flutter Version Manager
- **Flutter** (via FVM)
- **Xcode** (for iOS development)
- **Android Studio** (or other Android IDE with necessary SDKs)

## Setup

### 1. **Install FVM**

FVM is a tool for managing multiple Flutter versions. It allows you to ensure that every contributor uses the same version of Flutter.

#### Install FVM globally via Homebrew (macOS):

```bash
brew tap leoafarias/fvm
brew install fvm
```

#### Or install using Dart's package manager:

```bash
dart pub global activate fvm
```

### 2. **Install Flutter Version 3.24.3**

Once FVM is installed, navigate to the root of the project directory and run:

```bash
fvm install 3.24.3
```

This will install Flutter version 3.24.3 and link it to the project.

### 3. **Set the Flutter Version for the Project**

To ensure the project uses the correct version of Flutter, run:

```bash
fvm use 3.24.3
```

This command will create a `.fvm` directory and set the correct version of Flutter for the project.

### 4. **Ensure Flutter SDK is Set Up Correctly**

Once FVM has linked the correct version, you can verify the installation and the version being used by running:

```bash
fvm flutter doctor
```

This will check for any missing dependencies.

## Install Dependencies

After setting up FVM and Flutter, install the project dependencies by running:

```bash
fvm flutter pub get
```

This will fetch all the packages listed in `pubspec.yaml`.

## Running the App

### Run on Android

To run the app on an Android device/emulator, execute the following command:

```bash
fvm flutter run
```

### Run on iOS

To run the app on an iOS device or simulator, execute:

```bash
fvm flutter run --ios
```

Note: Make sure you have Xcode set up properly for iOS development. You can check this by running `flutter doctor`.

## Building the App

### Build APK for Android

To build an APK for Android, run the following command:

```bash
fvm flutter build apk
```

This will generate a release APK under the `build/app/outputs/flutter-apk` directory.

### Build for iOS

To build the app for iOS, run:

```bash
fvm flutter build ios
```

This will generate an iOS build that can be deployed to a device or submitted to the App Store.

## Cleaning the Project

If you want to clean the project (e.g., to remove any cached data or build artifacts), run:

```bash
fvm flutter clean
```

This will remove the `build/` folder, `.dart_tool/`, and other generated files.

---

## Useful Commands

- `fvm flutter doctor`: Check Flutter installation and dependencies.
- `fvm flutter pub get`: Install dependencies.
- `fvm flutter run`: Run the app.
- `fvm flutter build apk`: Build the Android APK.
- `fvm flutter build ios`: Build the iOS app.
- `fvm flutter clean`: Clean the project.

---

## Contributing

Feel free to fork the project and submit pull requests. Please ensure that you follow the established version of Flutter (v3.24.3) for consistency.

