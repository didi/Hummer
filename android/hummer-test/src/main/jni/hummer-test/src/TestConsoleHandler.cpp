//
// Created by didi on 2024/6/24.
//


#include "TestConsoleHandler.h"

void TestConsoleHandler::log(int level, string value) {
//    ConsoleHandler::log(level, value);
    warn("Test::[%d]%s", level, value.c_str());
}

TestConsoleHandler::TestConsoleHandler() {

}

TestConsoleHandler::~TestConsoleHandler() {

}
