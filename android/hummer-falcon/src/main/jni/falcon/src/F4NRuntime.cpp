//
// Created by didi on 2023/11/20.
//

#include <falcon/F4NRuntime.h>

#include <falcon/F4NContextMulti.h>
#include "falcon/falcon.h"
#include "falcon/F4NUtil.h"

void F4NRuntime::init() {

}

F4NRuntime::F4NRuntime() {
    F4NUtil::makeMainThread();
    fNContexts = list<F4NContext *>();
}

F4NContext *F4NRuntime::createContext() {
    F4NContext *fnContext = new F4NContextMulti();
    fNContexts.push_back(fnContext);

    return fnContext;
}

void F4NRuntime::destroyContext(F4NContext *f4NContext) {
    fNContexts.remove(f4NContext);
    f4NContext->stop();
    delete f4NContext;
}

void F4NRuntime::release() {
    auto it = fNContexts.begin();
    while (it != fNContexts.end()) {
        (*it)->stop();
        delete *it;
        ++it;
    }
    fNContexts.clear();
}

bool F4NRuntime::empty() {
    if (fNContexts.empty()) {
        return true;
    }
    return false;
}

F4NRuntime::~F4NRuntime() {
    release();
}



//*******************************************************************

