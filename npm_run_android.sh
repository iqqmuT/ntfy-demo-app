#!/bin/bash

# 'npm run android' requires Java, use Java from Android Studio

export ANDROID_HOME=/home/tumppi/Android/Sdk
export JAVA_HOME=/opt/android-studio/jre

export PATH=$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$PATH

npm run android
