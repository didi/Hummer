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
    ALooper_addFd(looper_, redPipe, 0, ALOOPER_EVENT_INPUT, MainThreadHandler::callbackFunc, this);
}

int MainThreadHandler::callbackFunc(int fd, int events, void *data) {
    char buffer[2];
    memset(buffer, 0, 2);
    size_t size = 2;
    read(fd, buffer, size);
    LOGD("MainLooper::handleMessage() buffer=%s", buffer);

    thread::id id = this_thread::get_id();
    LOGD("MainLooper::handleMessage()  fd=%u,events=%u,id=%u", fd, events, id);

    MainThreadHandler *mainLooper = (MainThreadHandler *) data;
    mainLooper->runOne();

    return 1;
}


void MainThreadHandler::runOne() {
    LOGD("MainLooper::runOne()");
    pthread_mutex_lock(&mutex);

    if (!messageQueue.empty()) {
        Message message = messageQueue.front();
        messageQueue.pop();
        pthread_mutex_unlock(&mutex);
        // 处理消息
        handleMessage(message);
    } else {
        pthread_mutex_unlock(&mutex);
    }
//    runOne();
}

void MainThreadHandler::handleMessage(const Message &message) {
    LOGD("MainLooper::handleMessage() start.. id=%d", message.messageId);
    if (message.function != nullptr) {
        message.function(message.messageId, message.content, message.data);
    }
    LOGD("MainLooper::handleMessage() stop.. id=%d", message.messageId);
}

void MainThreadHandler::sendMessage(const Message &message) {
    LOGD("MainLooper::sendMessage()");
    pthread_mutex_lock(&mutex);
    const static char *msg = "fd";
    size_t size = strlen(msg);
    messageQueue.push(message);
    write(writePipe, msg, size);

    pthread_mutex_unlock(&mutex);
}

void MainThreadHandler::release() {

}

MainThreadHandler::~MainThreadHandler() {
    ALooper_release(looper_);
}