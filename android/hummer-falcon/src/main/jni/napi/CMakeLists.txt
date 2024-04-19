cmake_minimum_required(VERSION 3.4.1)

project(hvdom VERSION 1.0 )

if (NAPI_ENGINE STREQUAL QuickJS)
    set(LIBS_JSE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/napi/libs/qjs)
    set(LIBS_JSE_FILE libqjs.so)
elseif (NAPI_ENGINE STREQUAL Hermes)
    set(LIBS_JSE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/napi/libs/hermes)
    set(LIBS_JSE_FILE libhermes.so)
endif()

include_directories(
        hummer
        napi/include
        napi/include/napi)

aux_source_directory( # Define variable for directory of sources
        hummer
        # Set variable name of sources directory
        DIR_SRC_HUMMER
        )

aux_source_directory( # Define variable for directory of dependency libraries
        ${LIBS_JSE_DIR}
        # Set variable name of dependency libraries directory
        DIR_LIBS
        )

add_library( # Sets the name of the library.
        hvdom
        # Sets the library as a shared library.
        SHARED
        # Provides a relative path to your source file(s).
        ${DIR_SRC_HUMMER}
        ${DIR_LIBS}
        )

find_library( # Sets the name of the path variable.
        log-lib

        # Specifies the name of the NDK library that
        # you want CMake to locate.
        log)

target_link_libraries( # Specifies the target library.
        hvdom

        # Links the target library to the log library
        # included in the NDK.
        ${log-lib}

        # libqjs.so/libhermes.so
        ${LIBS_JSE_DIR}/${ANDROID_ABI}/${LIBS_JSE_FILE}
        )
