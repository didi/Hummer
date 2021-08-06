# For more information about using CMake with Android Studio, read the
# documentation: https://d.android.com/studio/projects/add-native-code.html

# Sets the minimum version of CMake required to build the native library.

cmake_minimum_required(VERSION 3.4.1)

# 单独编译hummer-napi的cmakelist，打出libhummer-napi-debugger.so
ADD_SUBDIRECTORY(napi_hermes_cmake)

set(NAPI_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../../../../hummer-core/src/main/jni/napi)

include_directories(
        ${NAPI_DIR}/hummer
        ${NAPI_DIR}/napi/include
        ${NAPI_DIR}/napi/include/napi
        ./
        fbjni
        jsinspector
        reactjni)

aux_source_directory(reactjni DIR_SRC_JNI)

add_library( # Sets the name of the library.
        hermes-debugger
        # Sets the library as a shared library.
        SHARED
        # Provides a relative path to your source file(s).
        ${DIR_SRC_JNI}
        )

find_library( # Sets the name of the path variable.
        log-lib
        # Specifies the name of the NDK library that
        # you want CMake to locate.
        log)

target_link_libraries( # Specifies the target library.
        hermes-debugger

        # Links the target library to the log library
        # included in the NDK.
        ${log-lib}

        hummer-napi-debugger
        )