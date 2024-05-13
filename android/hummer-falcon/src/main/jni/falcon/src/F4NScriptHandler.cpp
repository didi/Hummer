//
// Created by didi on 2024/5/13.
//


#include "falcon/F4NScriptHandler.h"


F4NScriptHandler::F4NScriptHandler(F4NLoopHandler *loopHandler) {
    this->loopHandler = loopHandler;
    _onThreadLoopEnd_ = [&](F4NHandler *handler) {
        if (onThreadLoopEndFunc != nullptr) {
            onThreadLoopEndFunc(this);
        }
        if (onThreadLoopEnd != nullptr) {
            onThreadLoopEnd(this);
        }
    };
}


void F4NScriptHandler::start() {
    isRunning = true;
    loopHandler->addLoopEndListener(_onThreadLoopEnd_);
    F4NMessage message = F4NMessage();
    message.function = [&](int id, const string &msg, void *data) {
        if (onThreadStartFunc != nullptr) {
            onThreadStartFunc(this);
        }
        if (onThreadStart != nullptr) {
            onThreadStart(this);
        }
    };
    loopHandler->sendMessage(message);
}

void F4NScriptHandler::stop() {
    isRunning = false;
    loopHandler->removeLoopEndListener(_onThreadLoopEnd_);
}

void F4NScriptHandler::sendMessage(const F4NMessage &message) {
    if (!isRunning) {
        return;
    }
    if (message.loopMessage || message.delayMessage) {
        loopMessages.insert(make_pair(message.messageId, message));
    }
    loopHandler->sendMessage(message);
}

void F4NScriptHandler::removeMessage(const F4NMessage &message) {
    if (!isRunning) {
        return;
    }
    loopMessages.erase(message.messageId);
    loopHandler->removeMessage(message);
}

void F4NScriptHandler::removeMessage(long id) {
    if (!isRunning) {
        return;
    }
    auto it = loopMessages.find(id);
    if (it != loopMessages.end()) {
        loopHandler->removeMessage(it->second);
        loopMessages.erase(it);
    }
}

void F4NScriptHandler::setOnThreadStart(function<void(F4NHandler *)> function) {
    this->onThreadStartFunc = function;
}

void F4NScriptHandler::setOnThreadLoopEnd(function<void(F4NHandler *)> function) {
    this->onThreadLoopEndFunc = function;
}

F4NScriptHandler::~F4NScriptHandler() {

}
