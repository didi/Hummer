# For more information about using CMake with Android Studio, read the
# documentation: https://d.android.com/studio/projects/add-native-code.html

# Sets the minimum version of CMake required to build the native library.

cmake_minimum_required(VERSION 3.4.1)

#ADD_SUBDIRECTORY(jsc)
#ADD_SUBDIRECTORY(qjs)
#ADD_SUBDIRECTORY(hermes)
#ADD_SUBDIRECTORY(napi)

ADD_SUBDIRECTORY(hummer)
ADD_SUBDIRECTORY(hummer2)
ADD_SUBDIRECTORY(hvdom)