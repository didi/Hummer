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
//        pthread_cond_signal(&condition);
        condition_var.notify_one();
        // 等待线程退出
        // pthread_join(thread, nullptr);
    }
}

void F4NLoopHandler::sendMessage(const F4NMessage &message) {
    debug("NativeThread::sendMessage() id=%d", message.messageId);
//    pthread_mutex_lock(&mutex_pt);
//    addMessageOderByTime(message);
//    pthread_mutex_unlock(&mutex_pt);
    // 唤醒线程以处理消息
//    pthread_cond_signal(&condition);
    lock_guard<mutex> lock(mutex_var);
    addMessageOderByTime(message);
    condition_var.notify_one();
    debug("NativeThread::sendMessage() id=%d", message.messageId);
}


void F4NLoopHandler::removeMessage(const F4NMessage &message) {
    debug("NativeThread::removeMessage() id=%d", message.messageId);
//    pthread_mutex_lock(&mutex_pt);
//    removeMessageById(message);
//    pthread_mutex_unlock(&mutex_pt);
//    // 唤醒线程以处理消息
//    pthread_cond_signal(&condition);
    lock_guard<mutex> lock(mutex_var);
    removeMessageById(message);
    condition_var.notify_one();
    debug("NativeThread::removeMessage() id=%d", message.messageId);
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
    loopEndListeners.erase(std::remove_if(loopEndListeners.begin(), loopEndListeners.end(), [function](const std::function<void(F4NHandler *, long id)> &fun) {
        return function.target < void(F4NHandler * , long
        id)>() == fun.target < void(F4NHandler * , long
        id)>();
    }));
    pthread_mutex_unlock(&loop_mutex);
}

void F4NLoopHandler::dispatchLoopEnd(long id) {
    for (auto it = loopEndListeners.begin(); it != loopEndListeners.end(); it++) {
        (*it)(this, id);
    }
}

void F4NLoopHandler::handleMessage(const F4NMessage &message) {
    debug("NativeThread::handleMessage() start id=%d", message.messageId);
    if (message.function != nullptr) {
        message.function(message.messageId, message.content, message.data);
    }
    debug("NativeThread::handleMessage() stop id=%d", message.messageId);

    long id = message.delayMessage ? message.messageId : 0;
    if (onThreadLoopEnd != nullptr) {
        onThreadLoopEnd(this, id);
    }
    dispatchLoopEnd(id);
    debug("NativeThread::handleMessage() end id=%d", message.messageId);
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
//        error("NativeThread::wait_for()  lock--------");
        unique_lock<mutex> lock(mutex_var);
//        error("NativeThread::wait_for() --------");

        auto now = chrono::steady_clock::now();

        if (messageQueue.empty()) {
//            error("NativeThread::wait_for() *");
            condition_var.wait(lock, [this]() {
//                error("NativeThread::wait_for() 0");
                return (!messageQueue.empty() || !isRunning);
            });
        } else {
            condition_var.wait_for(lock, when_time - now, [this]() {
//                error("NativeThread::wait_for() 00");
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
//            error("NativeThread::wait_for() message");
            F4NMessage message = messageQueue.front();
            auto now = chrono::steady_clock::now();
            auto run = message.run_time_point;
            if (run <= now) {
                messageQueue.pop_front();
                if (message.loopMessage && message.interval_millisecond > 0) {
                    message.run_time_point = now + chrono::milliseconds(message.interval_millisecond);
//                    debug("NativeThread::addMessageOderByTime()  id=%d,delay=%d", message.messageId, message.interval_millisecond);
                    addMessageOderByTime(message);
//                    condition_var.notify_one();
//                    debug("NativeThread::addMessageOderByTime() --------------------- id=%d", message.messageId);
                }
                lock.unlock();
                //处理消息不需要加锁，可以释放锁后处理消息
//                error("NativeThread::wait_for() handleMessage 0");
                handleMessage(message);
//                error("NativeThread::wait_for() handleMessage 1");
            } else {
//                lock.unlock();
                when_time = message.run_time_point;
//                error("NativeThread::wait_for() **");
//                condition_var.wait_for(lock, chrono::milliseconds(1000), [this]() {
//                    error("NativeThread::wait_for() 00");
//                    return (!messageQueue.empty() || !isRunning);
//                });
            }
        }
    }
}


//void F4NLoopHandler::run() {
//    if (onThreadStart != nullptr) {
//        onThreadStart(this);
//    }
//
//    while (isRunning) {
//        pthread_mutex_lock(&mutex_pt);
//        // 等待消息或线程终止信号
//        while (messageQueue.empty()) {
//            pthread_cond_wait(&condition, &mutex_pt);
//        }
//        if (!messageQueue.empty()) {
//            auto now = chrono::steady_clock::now();
//            F4NMessage message = messageQueue.front();
//            auto run = message.run_time_point;
//            if (run <= now) {
//                messageQueue.pop_front();
//                if (message.loopMessage && message.interval_millisecond > 0) {
//                    message.run_time_point = now + chrono::milliseconds(message.interval_millisecond);
//                    debug("NativeThread::addMessageOderByTime()  id=%d,delay=%d", message.messageId,message.interval_millisecond);
//                    addMessageOderByTime(message);
//                    debug("NativeThread::addMessageOderByTime() --------------------- id=%d", message.messageId);
//                }
//                pthread_mutex_unlock(&mutex_pt);
//                //处理消息不需要加锁，可以释放锁后处理消息
//                handleMessage(message);
//            } else {
//                pthread_mutex_unlock(&mutex_pt);
//                //如果消息未到执行事件让线程睡眠一段事件后唤醒
//                debug("NativeThread::sleep_for() --------------------- id=%d", message.messageId);
//                this_thread::sleep_for(run - now);
//            }
//            // 处理消息
//        } else {
//            pthread_mutex_unlock(&mutex_pt);
//        }
//    }
//}


F4NLoopHandler::~F4NLoopHandler() {

}





