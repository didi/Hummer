cmake_minimum_required(VERSION 3.4.1)

include_directories(
        hummer
        napi/include)

aux_source_directory( # Define variable for directory of sources
        hummer
        # Set variable name of sources directory
        DIR_SRC_HUMMER
        )

aux_source_directory( # Define variable for directory of dependency libraries
        napi/libs
        # Set variable name of dependency libraries directory
        DIR_LIBS
        )

add_library( # Sets the name of the library.
        hummer-napi
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
        hummer-napi

        # Links the target library to the log library
        # included in the NDK.
        ${log-lib}

        # QuickJS
        ${CMAKE_CURRENT_SOURCE_DIR}/napi/libs/${ANDROID_ABI}/libquickjs.so

        # N-API
        ${CMAKE_CURRENT_SOURCE_DIR}/napi/libs/${ANDROID_ABI}/libnapi_qjs.so
        )
