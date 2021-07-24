# For more information about using CMake with Android Studio, read the
# documentation: https://d.android.com/studio/projects/add-native-code.html

# Sets the minimum version of CMake required to build the native library.

cmake_minimum_required(VERSION 3.4.1)

set(NAPI_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../../../../hummer-core/src/main/jni/napi)

include_directories(
        ${NAPI_DIR}/hummer
        ${NAPI_DIR}/napi/include)

aux_source_directory( # Define variable for directory of sources
        ${NAPI_DIR}/hummer
        # Set variable name of sources directory
        DIR_SRC_HUMMER
        )

aux_source_directory( # Define variable for directory of dependency libraries
        ${NAPI_DIR}/napi/libs/hermes
        # Set variable name of dependency libraries directory
        DIR_LIBS
        )

add_library( # Sets the name of the library.
        hummer-napi-debugger
        # Sets the library as a shared library.
        SHARED
        # Provides a relative path to your source file(s).
        ${DIR_SRC_HUMMER} ${DIR_LIBS}
        )

find_library( # Sets the name of the path variable.
        log-lib
        # Specifies the name of the NDK library that
        # you want CMake to locate.
        log)

target_link_libraries( # Specifies the target library.
        hummer-napi-debugger

        # Links the target library to the log library
        # included in the NDK.
        ${log-lib}

        # QuickJS/Hermes
        ${NAPI_DIR}/napi/libs/hermes/${ANDROID_ABI}/libhermes.so

        # N-API
        ${NAPI_DIR}/napi/libs/hermes/${ANDROID_ABI}/libnapi_hermes.so
        )