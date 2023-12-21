//
// Created by didi on 2023/11/20.
//

#include <hvdom/vdom_runtime.h>

#include <hvdom/vdom_context_multi.h>

void VDOMRuntime::init() {

}

VDOMRuntime::VDOMRuntime() {
    vdomContexts = list<VDOMContext *>();
}

VDOMContext *VDOMRuntime::createContext() {
    VDOMContext *vdomContext = new VDOMContextMulti();
    vdomContexts.push_back(vdomContext);

    return vdomContext;
}

void VDOMRuntime::destroyContext(VDOMContext *vdomContext) {
    vdomContexts.remove(vdomContext);
    delete vdomContext;
}

void VDOMRuntime::release() {
    auto it = vdomContexts.begin();
    while (it != vdomContexts.end()) {
        delete *it;
        ++it;
    }
}

VDOMRuntime::~VDOMRuntime() {
    release();
}



//*******************************************************************

