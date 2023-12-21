////
//// Created by didi on 2023/11/14.
////
//
#include "hvdom/vdom_native_thread_handler.h"

void VDOMNativeThreadHandler::start() {
    info("NativeThread::start() ");
    isRunning = true;

    std::function<int(int, int)> init = [&](int a, int b) {
        return a + b;
    };

    pthread_create(&thread, nullptr, threadInitFunction, this);
}

void VDOMNativeThreadHandler::stop() {
    info("NativeThread::stop() ");
    if (isRunning) {
        isRunning = false;
        // 唤醒线程以便它可以退出
        pthread_cond_signal(&condition);
        // 等待线程退出
        // pthread_join(thread, nullptr);
    }
}

void VDOMNativeThreadHandler::sendMessage(const Message &message) {

    info("NativeThread::sendMessage() ");
    pthread_mutex_lock(&mutex);
    messageQueue.push(message);
    pthread_mutex_unlock(&mutex);
    // 唤醒线程以处理消息
    pthread_cond_signal(&condition);
}

void VDOMNativeThreadHandler::handleMessage(const Message &message) {
    info("NativeThread::handleMessage() start.. id=%d,msg=%s", message.messageId,message.content.c_str());
    if (message.function != nullptr) {
        message.function(message.messageId, message.content, message.data);
    }
    info("NativeThread::handleMessage() stop.. id=%d", message.messageId);
}


void *VDOMNativeThreadHandler::threadInitFunction(void *arg) {
    VDOMNativeThreadHandler *pNativeThread = static_cast<VDOMNativeThreadHandler *>(arg);
    pNativeThread->run();
    return nullptr;
}

void VDOMNativeThreadHandler::run() {
//    info("NativeThread::run()");
    if (onThreadStart != nullptr) {
        onThreadStart(this);
    }
//    info("NativeThread::run()+");

    while (isRunning) {
//        info("NativeThread::run() next wait");
        pthread_mutex_lock(&mutex);
        // 等待消息或线程终止信号
        while (messageQueue.empty()) {
//            info("NativeThread::pthread_cond_wait...");
            pthread_cond_wait(&condition, &mutex);
//            info("NativeThread::pthread_cond_wait notify");
        }
//        info("NativeThread::pthread_cond_wait do...");
        if (!messageQueue.empty()) {
            Message message = messageQueue.front();
            messageQueue.pop();
            pthread_mutex_unlock(&mutex);

            // 处理消息
            handleMessage(message);
        } else {
            pthread_mutex_unlock(&mutex);
        }
    }
}

VDOMNativeThreadHandler::VDOMNativeThreadHandler() {

}

