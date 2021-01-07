cmake_minimum_required(VERSION 3.4.1)

include_directories(
        ./
)

file(GLOB_RECURSE DIR_SRC_FBJNI "fbjni/*.cpp" "lyra/*.cpp")

add_library(fbjni SHARED ${DIR_SRC_FBJNI})

find_library(log-lib log)

target_link_libraries(fbjni ${log-lib})