cmake_minimum_required(VERSION 3.4.1)

file(GLOB_RECURSE sources "*.c" "*.cpp")

add_library(hummer-qjs SHARED ${sources})

find_library( # Sets the name of the path variable.
        log-lib
        # Specifies the name of the NDK library that
        # you want CMake to locate.
        log)

target_link_libraries(hummer-qjs ${log-lib})
