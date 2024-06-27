cmake_minimum_required(VERSION 3.4.1)

project(HummerTest VERSION 1.0)


if (NAPI_ENGINE STREQUAL QuickJS)
    set(LIBS_JSE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../napi/libs)
    set(LIBS_JSE_FILE libqjs.so)
elseif (NAPI_ENGINE STREQUAL Hermes)
    set(LIBS_JSE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../napi/libs)
    set(LIBS_JSE_FILE libhermes.so)
endif ()

set(CMAKE_BUILD_TYPE Debug)

set(FALCON_LIBS_DIR /Users/didi/Documents/workspaces/Hummer/android/hummer-falcon/build/intermediates/library_jni/debug/jni)
set(FALCON_INCLUDE_DIR /Users/didi/Documents/workspaces/Hummer/android/hummer-falcon/src/main/jni/falcon)
set(NAPI_INCLUDE_DIR /Users/didi/Documents/workspaces/Hummer/android/hummer-falcon/src/main/jni/napi)

include_directories(
        src
        include
        ${FALCON_INCLUDE_DIR}/include
        ${NAPI_INCLUDE_DIR}/include
        )

aux_source_directory( # Define variable for directory of sources
        ../napi/include
        # Set variable name of sources directory
        DIR_SRC_NAPI
        )

aux_source_directory( # Define variable for directory of sources
        src
        # Set variable name of sources directory
        DIR_SRC_HUMMER
        )

aux_source_directory( # Define variable for directory of dependency libraries
        ${LIBS_JSE_DIR}
        # Set variable name of dependency libraries directory
        DIR_LIBS
        )

#aux_source_directory( # Define variable for directory of dependency libraries
#        test
#        # Set variable name of dependency libraries directory
#        DIR_TEST
#        )

add_library( # Sets the name of the library.
        HummerTest
        # Sets the library as a shared library.
        SHARED
        # Provides a relative path to your source file(s).
        ${DIR_SRC_HUMMER}
        #        ${DIR_LIBS}
        )

find_library( # Sets the name of the path variable.
        log-lib

        # Specifies the name of the NDK library that
        # you want CMake to locate.
        log)


target_link_libraries( # Specifies the target library.
        HummerTest

        # Links the target library to the log library
        # included in the NDK.
        ${log-lib}

        ${FALCON_LIBS_DIR}/${ANDROID_ABI}/libfalcon.so

        )
