//
// Created by didi on 2024/5/13.
//


#include "falcon/F4NScriptHandler.h"


F4NScriptHandler::F4NScriptHandler(F4NLoopHandler *loopHandler) {
    this->loopHandler = loopHandler;
    _onThreadLoopEnd_ = [&](F4NHandler *handler, long id) {
        if (onThreadLoopEndFunc != nullptr) {
            onThreadLoopEndFunc(this);
        }
        if (onThreadLoopEnd != nullptr) {
            onThreadLoopEnd(this, id);
        }
        if (id > 0) {
            //移除延迟处理消息
            removeMessage(id);
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
//    debug("F4NScriptHandler::stop() end id=%d",0);
    loopHandler->removeLoopEndListener(_onThreadLoopEnd_);
    pthread_mutex_lock(&loop_mutex);
    //清除延迟消息和循环消息
    for (auto it = loopMessages.begin(); it != loopMessages.end(); it++) {
        loopHandler->removeMessage(it->second);
    }
    loopMessages.clear();
    pthread_mutex_unlock(&loop_mutex);

    debug("F4NScriptHandler::stop() end id=%d",0);
}

void F4NScriptHandler::sendMessage(const F4NMessage &message) {
    if (!isRunning) {
        return;
    }
    //记录延迟消息和循环消息
    if (message.loopMessage || message.delayMessage) {
        pthread_mutex_lock(&loop_mutex);
        loopMessages.insert(make_pair(message.messageId, message));
        pthread_mutex_unlock(&loop_mutex);
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
    pthread_mutex_lock(&loop_mutex);
    auto it = loopMessages.find(id);
    if (it != loopMessages.end()) {
        loopMessages.erase(it);
        pthread_mutex_unlock(&loop_mutex);
        loopHandler->removeMessage(it->second);
    } else {
        pthread_mutex_unlock(&loop_mutex);
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
