# For more information about using CMake with Android Studio, read the
# documentation: https://d.android.com/studio/projects/add-native-code.html

# Sets the minimum version of CMake required to build the native library.

cmake_minimum_required(VERSION 3.4.1)

ADD_SUBDIRECTORY(fbjni)
ADD_SUBDIRECTORY(folly)

set(HERMES_LIB_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../../../../hummer-core/src/main/jni/hermes/hermes/libs)

include_directories(
        ./
        include
        folly
        fbjni
        reactjni
        jsinspector
        )

aux_source_directory(./ DIR_SRC_JNI)
aux_source_directory(reactjni DIR_SRC_JNI)
aux_source_directory(jsinspector DIR_SRC_JNI)
aux_source_directory(hermes/inspector DIR_SRC_JNI)
aux_source_directory(hermes/inspector/chrome DIR_SRC_JNI)
aux_source_directory(hermes/inspector/detail DIR_SRC_JNI)
aux_source_directory(include/jsi DIR_SRC_JNI)

add_library( # Sets the name of the library.
        hummer-hermes-inspector
        # Sets the library as a shared library.
        SHARED
        # Provides a relative path to your source file(s).
        ${DIR_SRC_JNI}
        )

# Searches for a specified prebuilt library and stores the path as a
# variable. Because CMake includes system libraries in the search path by
# default, you only need to specify the name of the public NDK library
# you want to add. CMake verifies that the library exists before
# completing its build.

find_library( # Sets the name of the path variable.
        log-lib
        # Specifies the name of the NDK library that
        # you want CMake to locate.
        log)

# Specifies libraries CMake should link to your target library. You
# can link multiple libraries, such as libraries you define in this
# build script, prebuilt third-party libraries, or system libraries.

target_link_libraries( # Specifies the target library.
        hummer-hermes-inspector

        fbjni

        folly

        # Links the target library to the log library
        # included in the NDK.
        ${log-lib}

        # Hermes
        ${HERMES_LIB_DIR}/${ANDROID_ABI}/libhermes.so

        )