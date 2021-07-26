cmake_minimum_required(VERSION 3.4.1)

#file(GLOB_RECURSE sources "*.c" "*.cpp")

#add_library(hummer-qjs SHARED ${sources})

include_directories(
        hummer
        quickjs/include)

aux_source_directory( # Define variable for directory of sources
        hummer
        # Set variable name of sources directory
        DIR_SRC_HUMMER
        )

aux_source_directory( # Define variable for directory of dependency libraries
        quickjs/libs
        # Set variable name of dependency libraries directory
        DIR_LIBS
        )

add_library( # Sets the name of the library.
        hummer-qjs
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

#target_link_libraries(hummer-qjs ${log-lib})

target_link_libraries( # Specifies the target library.
        hummer-qjs

        # Links the target library to the log library
        # included in the NDK.
        ${log-lib}

        # JavaScriptCore
        ${CMAKE_CURRENT_SOURCE_DIR}/quickjs/libs/${ANDROID_ABI}/libqjs.so
        )
