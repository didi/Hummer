//
// Created by didi on 2023/11/20.
//
//#include <hvdom/Render.h>
#include "hvdom/vdom_render.h"


VDOMRender::VDOMRender() {

}

void VDOMRender::init(ComponentFactory *componentFactory, VDOMThreadHandler *renderThreadHandler, VDOMThreadHandler *jsThreadHandler) {
    componentFactory_ = componentFactory;
    renderThreadHandler_ = renderThreadHandler;
    jsThreadHandler_ = jsThreadHandler;
}

void VDOMRender::renderRoot(Element *rootElement) {
    info("VDOMRender::renderRoot()");
    if (currentRootElement_ == nullptr) {
        renderMainRoot(rootElement);
    } else {
        diffCurrentDom(rootElement);
    }
}


void VDOMRender::renderMainRoot(Element *rootElement) {
    info("VDOMRender::renderMainRoot()");
    Message message = Message(110, "renderMainRoot");
    message.data = this;
    message.function = [rootElement](int id, const string &msg, void *data) {
        info("VDOMRender::renderMainRoot() run %s",rootElement->toString().c_str());
        VDOMRender *render = static_cast<VDOMRender *>(data);
        info("VDOMRender::renderMainRoot() run + %u,%u",render,rootElement);
        long rootId = render->createNewDom(rootElement);
        info("VDOMRender::renderMainRoot() run .");
        render->renderRoot(rootId);
        info("VDOMRender::renderMainRoot() run *");
//        currentRootElement_ = rootElement;
    };
    renderThreadHandler_->sendMessage(message);


//    info("VDOMRender::renderMainRoot() run");
//    VDOMRender *render = static_cast<VDOMRender *>(this);
//    info("VDOMRender::renderMainRoot() run + %u,%u",render,rootElement);
//    long rootId = render->createNewDom(rootElement);
//    info("VDOMRender::renderMainRoot() run .");
//    render->renderRoot(rootId);
//    info("VDOMRender::renderMainRoot() run *");
//    currentRootElement_ = rootElement;
}

long VDOMRender::createNewDom(Element *rootElement) {

    Element *element = rootElement;
    long elementId = ++currentNativeElementId_;

    HMObject *props = new HMObject();
    HMString *elementName = new HMString(element->tag_.c_str());
    props->setValue("element_name", elementName);

    HMValue *propsX[1] = {props};

    componentFactory_->newInstance(ElementClsId, elementId, 1, propsX);
    info("createNewDom %s",rootElement->toString().c_str());

    map<string, HMValue *> *attributes = element->attributes_;
    auto it = attributes->begin();
    while (it != attributes->end()) {
        HMObject *hmObject = new HMObject();
        hmObject->setValue("attribute_name", new HMString(it->first.c_str()));
        hmObject->setValue("attribute", it->second);

        HMValue *propsX[1] = {hmObject};
        componentFactory_->callMethod(ElementClsId, elementId, ElementMethod_setAttribute, 1, propsX);
        it++;
    }

    if (element->style_ != nullptr) {
        HMValue *propsX[1] = {element->style_};
        componentFactory_->callMethod(ElementClsId, elementId, ElementMethod_setStyle, 1, propsX);
    }

    map<string, HMFunction *> *eventListeners = element->eventListeners_;

    for (auto it = eventListeners->begin(); it != eventListeners->end(); it++) {
        HMObject *hmObject = new HMObject();
        HMFunctionX *hmFunction = new HMFunctionX();
        hmFunction->hmFunction = it->second;
        hmFunction->vdomRender = this;
        hmObject->setValue("event_name", new HMString(it->first.c_str()));
//        hmObject->setValue("event_listener", it->second);
        hmObject->setValue("event_listener", hmFunction);

        HMValue *propsX[1] = {hmObject};

        componentFactory_->callMethod(ElementClsId, elementId, ElementMethod_addEventListener, 1, propsX);
    }

    list<Element *> *children = element->children_;
    for (auto it = children->begin(); it != children->end(); it++) {
        long childId = createNewDom(*it);
        HMNumber *hmObject = new HMNumber(childId);

        HMValue *propsX[1] = {hmObject};
        componentFactory_->callMethod(ElementClsId, elementId, ElementMethod_appendChild, 1, propsX);
    }

    return elementId;
}

void VDOMRender::renderRoot(long rootNativeElementId) {
    info("VDOMRender::renderRoot(id)");
    HMNumber *hmNumber = new HMNumber(rootNativeElementId);
    HMValue *propsX[1] = {hmNumber};
    componentFactory_->callMethod(RenderClsId, 0, RenderMethod_renderRoot, 1, propsX);
    hmNumber->unprotect();

}


bool VDOMRender::diffCurrentDom(Element *rootElement) {


    return false;
}

VDOMRender::~VDOMRender() {

}

void testRunStart() {
    thread::id id = this_thread::get_id();
    info("HMFunctionX::NativeThread::testRunStart() ::%u", id);
}

void testRun() {
    thread::id id = this_thread::get_id();
    info("HMFunctionX::call() testRun() ::%u", id);
}

HMValue *HMFunctionX::call(HMValue *hmValue) {
    info("HMFunctionX::call()");
//    if (vdomRender->renderThreadHandler_ != nullptr) {
//        info("HMFunctionX::sendMessage()");
//        Message message = Message(1, "2222");
//        message.function = [&](int id, const string &msg, void *data) {
//            testRun();
//
//            HMObject *hmObject = new HMObject();
//            hmObject->setValue("me", new HMString("hello me."));
//
//            HMValue *propsX[1] = {hmObject};
//            vdomRender->componentFactory_->callMethod(ServiceClsId, 0, ServiceMethod_call, 1, propsX);
//        };
//        vdomRender->renderThreadHandler_->sendMessage(message);
//
//    }

    if (vdomRender->jsThreadHandler_ != nullptr){
        info("HMFunctionX::hmFunction->call(hmValue)");
        Message message = Message(1, "2222");
        message.function = [&,hmValue](int id, const string &msg, void *data) {
            hmFunction->call(hmValue);
        };
        vdomRender->jsThreadHandler_->sendMessage(message);
    }

    return nullptr;
}
