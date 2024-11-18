#!/bin/bash

# Script to clean, upgrade, and build a Flutter Android app
# Located in the same directory as the 'pfm_paynet' Flutter project folder

# Exit immediately if a command exits with a non-zero status
set -e

# Function to display a header message
function print_header {
    echo "========================================"
    echo "$1"
    echo "========================================"
}

# Step 1: Navigate to the Flutter project directory
FLUTTER_PROJECT_DIR="pfm_paynet"

if [ ! -d "$FLUTTER_PROJECT_DIR" ]; then
    echo "Error: Flutter project folder '$FLUTTER_PROJECT_DIR' not found!"
    exit 1
fi

print_header "Navigating to the Flutter project directory: $FLUTTER_PROJECT_DIR"
cd "$FLUTTER_PROJECT_DIR"

# Step 2: Clean Flutter project
print_header "Cleaning Flutter project"
flutter clean

# Step 3: Get and upgrade dependencies
print_header "Getting and upgrading dependencies"
flutter pub get
flutter pub upgrade

# Step 4: Build APK for Android
print_header "Building APK for Android"
flutter build apk --release

# Step 5: Move the APK to a specific directory
OUTPUT_DIR="../build_output"
APK_PATH="build/app/outputs/flutter-apk/app-release.apk"

if [ -f "$APK_PATH" ]; then
    print_header "Moving APK to $OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
    mv "$APK_PATH" "$OUTPUT_DIR/"
    echo "APK moved to: $OUTPUT_DIR/"
else
    echo "Build failed: APK not found."
    exit 1
fi

# Step 6: Notify build success
print_header "Build completed successfully!"
