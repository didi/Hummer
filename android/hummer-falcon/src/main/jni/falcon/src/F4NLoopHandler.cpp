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
        condition_var.notify_one();
    }
}

void F4NLoopHandler::sendMessage(const F4NMessage &message) {
    lock_guard<mutex> lock(mutex_var);
    addMessageOderByTime(message);
    condition_var.notify_one();
}


void F4NLoopHandler::removeMessage(const F4NMessage &message) {
    lock_guard<mutex> lock(mutex_var);
    removeMessageById(message);
    condition_var.notify_one();
}

// 自定义比较函数，用于按照 Message 的 run_time_point 升序排序
bool compareMessageTime(const F4NMessage &msg1, const F4NMessage &msg2) {
    return msg1.run_time_point <= msg2.run_time_point;
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

void F4NLoopHandler::addLoopEndListener(const function<void(F4NHandler *, long id)> function) {
    pthread_mutex_lock(&loop_mutex);
    loopEndListeners.push_back(function);
    pthread_mutex_unlock(&loop_mutex);
}

void F4NLoopHandler::removeLoopEndListener(const function<void(F4NHandler *, long id)> function) {
    pthread_mutex_lock(&loop_mutex);
    loopEndListeners.erase(
            std::remove_if(loopEndListeners.begin(), loopEndListeners.end(), [function](const std::function<void(F4NHandler *, long id)> &fun) {
                return function.target < void(F4NHandler * , long
                id)>() == fun.target < void(F4NHandler * , long
                id)>();
            }), loopEndListeners.end()
    );
    pthread_mutex_unlock(&loop_mutex);
}

void F4NLoopHandler::dispatchLoopEnd(long id) {
    for (auto it = loopEndListeners.begin(); it != loopEndListeners.end(); it++) {
        (*it)(this, id);
    }
}

void F4NLoopHandler::handleMessage(const F4NMessage &message) {
    if (message.function != nullptr) {
        message.function(message.messageId, message.content, message.data);
    }

    long id = message.delayMessage ? message.messageId : 0;
    if (onThreadLoopEnd != nullptr) {
        onThreadLoopEnd(this, id);
    }
    dispatchLoopEnd(id);
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

    chrono::time_point<chrono::steady_clock> when_time = chrono::steady_clock::now();

    while (isRunning) {
        unique_lock<mutex> lock(mutex_var);
        auto now = chrono::steady_clock::now();

        if (messageQueue.empty()) {
            condition_var.wait(lock, [this]() {
                return (!messageQueue.empty() || !isRunning);
            });
        } else {
            condition_var.wait_for(lock, when_time - now, [this]() {
                bool time_ok = true;
                auto time_now = chrono::steady_clock::now();
                if (!messageQueue.empty()) {
                    F4NMessage message = messageQueue.front();
                    time_ok = message.run_time_point < time_now;
                } else {
                    return true;
                }
                return ((!messageQueue.empty() && time_ok) || !isRunning);
            });
        }
        if (!messageQueue.empty()) {
            F4NMessage message = messageQueue.front();
            auto now = chrono::steady_clock::now();
            auto run = message.run_time_point;
            if (run <= now) {
                messageQueue.pop_front();
                if (message.loopMessage && message.interval_millisecond > 0) {
                    message.run_time_point = now + chrono::milliseconds(message.interval_millisecond);
                    addMessageOderByTime(message);
                }
                lock.unlock();
                //处理消息不需要加锁，可以释放锁后处理消息
                handleMessage(message);
            } else {
                when_time = message.run_time_point;
            }
        }
    }
}


F4NLoopHandler::~F4NLoopHandler() {

}





