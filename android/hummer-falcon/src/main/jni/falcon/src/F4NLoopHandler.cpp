////
//// Created by didi on 2023/11/14.
////
//
#include "falcon/F4NLoopHandler.h"


F4NLoopHandler::F4NLoopHandler() {

}

void F4NLoopHandler::start() {
    info("NativeThread::start() ");
    isRunning = true;

    std::function<int(int, int)> init = [&](int a, int b) {
        return a + b;
    };

    pthread_create(&thread, nullptr, threadInitFunction, this);
}

void F4NLoopHandler::stop() {
    info("NativeThread::stop() ");
    if (isRunning) {
        isRunning = false;
        // 唤醒线程以便它可以退出
        pthread_cond_signal(&condition);
        // 等待线程退出
        // pthread_join(thread, nullptr);
    }
}

void F4NLoopHandler::sendMessage(const F4NMessage &message) {
    debug("NativeThread::sendMessage() id=%d", message.messageId);
    pthread_mutex_lock(&mutex);
    addMessageOderByTime(message);
    pthread_mutex_unlock(&mutex);
    // 唤醒线程以处理消息
    pthread_cond_signal(&condition);
}


void F4NLoopHandler::removeMessage(const F4NMessage &message) {
    debug("NativeThread::removeMessage() id=%d", message.messageId);
    pthread_mutex_lock(&mutex);
    removeMessageById(message);
    pthread_mutex_unlock(&mutex);
}

// 自定义比较函数，用于按照 Message 的 run_time_point 升序排序
bool compareMessageTime(const F4NMessage &msg1, const F4NMessage &msg2) {
    return msg1.run_time_point < msg2.run_time_point;
}

void F4NLoopHandler::addMessageOderByTime(const F4NMessage &message) {
    // 使用 lower_bound 找到插入位置
    auto it = lower_bound(messageQueue.begin(), messageQueue.end(), message, compareMessageTime);
    // 插入新的消息到找到的位置
    messageQueue.insert(it, message);
}


void F4NLoopHandler::removeMessageById(const F4NMessage &message) {
    // 移除messageId相等的消息
    messageQueue.erase(remove_if(messageQueue.begin(), messageQueue.end(), [message](const F4NMessage &msg) {
        return message.messageId == msg.messageId;
    }), messageQueue.end());
}

void F4NLoopHandler::addLoopEndListener(const function<void(F4NHandler *)> function) {
    pthread_mutex_lock(&loop_mutex);
    loopEndListeners.push_back(function);
    pthread_mutex_unlock(&loop_mutex);
}

void F4NLoopHandler::removeLoopEndListener(const function<void(F4NHandler *)> function) {
    pthread_mutex_lock(&loop_mutex);
    loopEndListeners.erase(std::remove_if(loopEndListeners.begin(), loopEndListeners.end(), [function](const std::function<void(F4NHandler *)> &fun) {
        return function.target<void(F4NHandler *)>() == fun.target<void(F4NHandler *)>();
    }));
    pthread_mutex_unlock(&loop_mutex);
}

void F4NLoopHandler::dispatchLoopEnd() {
    for (auto it = loopEndListeners.begin(); it != loopEndListeners.end(); it++) {
        (*it)(this);
    }
}

void F4NLoopHandler::handleMessage(const F4NMessage &message) {
//    debug("NativeThread::handleMessage() start id=%d", message.messageId);
    if (message.function != nullptr) {
        message.function(message.messageId, message.content, message.data);
    }
//    debug("NativeThread::handleMessage() stop id=%d", message.messageId);

    if (onThreadLoopEnd != nullptr) {
        onThreadLoopEnd(this);
    }
    dispatchLoopEnd();
}


void *F4NLoopHandler::threadInitFunction(void *arg) {
    F4NLoopHandler *pNativeThread = static_cast<F4NLoopHandler *>(arg);
    pNativeThread->run();
    return nullptr;
}


void F4NLoopHandler::run() {
    if (onThreadStart != nullptr) {
        onThreadStart(this);
    }

    while (isRunning) {
        pthread_mutex_lock(&mutex);
        // 等待消息或线程终止信号
        while (messageQueue.empty()) {
            pthread_cond_wait(&condition, &mutex);
        }
        if (!messageQueue.empty()) {
            auto now = chrono::steady_clock::now();
            F4NMessage message = messageQueue.front();
            auto run = message.run_time_point;
            if (run <= now) {
                messageQueue.pop_front();
                if (message.loopMessage && message.interval_millisecond > 0) {
                    message.run_time_point = now + chrono::milliseconds(message.interval_millisecond);
                    addMessageOderByTime(message);
                }
                pthread_mutex_unlock(&mutex);
                //处理消息不需要加锁，可以释放锁后处理消息
                handleMessage(message);
            } else {
                pthread_mutex_unlock(&mutex);
                //如果消息未到执行事件让线程睡眠一段事件后唤醒
                this_thread::sleep_for(run - now);
            }
            // 处理消息
        } else {
            pthread_mutex_unlock(&mutex);
        }
    }
}


F4NLoopHandler::~F4NLoopHandler() {

}





