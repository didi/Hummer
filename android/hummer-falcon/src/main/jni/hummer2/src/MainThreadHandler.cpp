//
// Created by didi on 2023/12/7.
//

#include "MainThreadHandler.h"

MainThreadHandler::MainThreadHandler() {

}

void MainThreadHandler::init() {
    pipe(messagePipe);
    redPipe = messagePipe[0];
    writePipe = messagePipe[1];

    looper_ = ALooper_forThread();
    if (looper_ == nullptr) {
        looper_ = ALooper_prepare(0);
    }

    LOGI("MainLooper::init() redPipe=%u,writePipe=%u", redPipe, writePipe);
    ALooper_addFd(looper_, redPipe, ALOOPER_POLL_CALLBACK, ALOOPER_EVENT_INPUT, MainThreadHandler::callbackFunc, this);
}

int MainThreadHandler::callbackFunc(int fd, int events, void *data) {
    char buffer[128];
    memset(buffer, 0, 2);
    size_t size = sizeof(buffer) - 1;
    size_t size_read = read(fd, buffer, size);

    thread::id id = this_thread::get_id();
    LOGI("MainLooper::handleMessage()  fd=%u,events=%u,id=%ud,size=%d", fd, events, id, size_read);

    MainThreadHandler *mainLooper = (MainThreadHandler *) data;
    if (size_read > 2) {
        while (size_read > 0) {
            mainLooper->runOne();
            size_read -= 2;
        }
    } else {
        mainLooper->runOne();
    }

    return 1;
}


void MainThreadHandler::runOne() {
    LOGD("MainLooper::runOne() size=%d",messageQueue.size());
    pthread_mutex_lock(&mutex);

    if (!messageQueue.empty()) {
        F4NMessage message = messageQueue.front();
        messageQueue.pop();
        pthread_mutex_unlock(&mutex);
        // 处理消息
        handleMessage(message);
    } else {
        pthread_mutex_unlock(&mutex);
    }
}

void MainThreadHandler::handleMessage(const F4NMessage &message) {
//    LOGD("MainLooper::handleMessage() start id=%d", message.messageId);
    if (message.function != nullptr) {
        message.function(message.messageId, message.content, message.data);
    }
//    LOGD("MainLooper::handleMessage() stop id=%d", message.messageId);
    if (onThreadLoopEnd != nullptr) {
        onThreadLoopEnd(this,message.messageId);
    }
}

void MainThreadHandler::sendMessage(const F4NMessage &message) {
//    LOGD("MainLooper::sendMessage() start");
    pthread_mutex_lock(&mutex);
    const static char *msg = "fd";
    size_t size = strlen(msg);
    messageQueue.push(message);
    write(writePipe, msg, size);

    pthread_mutex_unlock(&mutex);
//    LOGD("MainLooper::sendMessage() stop size=%d", messageQueue.size());

    ALooper_wake(looper_);
}

void MainThreadHandler::release() {

}

MainThreadHandler::~MainThreadHandler() {
    close(writePipe);
    close(redPipe);

    ALooper_release(looper_);

}
