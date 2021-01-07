cmake_minimum_required(VERSION 3.4.1)

include_directories(
        ./
)

file(GLOB_RECURSE DIR_SRC_FOLLY "folly/*.cpp")
file(GLOB_RECURSE DIR_SRC_DOUBLE_CONVERSION "double-conversion/*.cc")

add_library(folly SHARED ${DIR_SRC_FOLLY} ${DIR_SRC_DOUBLE_CONVERSION})

find_library(log-lib log)

target_link_libraries(folly ${log-lib})