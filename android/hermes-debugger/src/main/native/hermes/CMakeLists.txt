# For more information about using CMake with Android Studio, read the
# documentation: https://d.android.com/studio/projects/add-native-code.html

# Sets the minimum version of CMake required to build the native library.

cmake_minimum_required(VERSION 3.4.1)

set(HERMES_CMAKE ${CMAKE_CURRENT_SOURCE_DIR}/../../../../../hummer-core/src/main/jni/hermes)

# 单独编译hermes版本的cmakelist，打出libhummer-hermes.so
ADD_SUBDIRECTORY(${HERMES_CMAKE} hummer_hermes)