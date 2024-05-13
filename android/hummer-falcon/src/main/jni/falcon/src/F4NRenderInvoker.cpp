//
// Created by didi on 2023/12/3.
//

#include "falcon/F4NRenderInvoker.h"
#include "falcon/F4NElement.h"
#include "falcon/F4NComponent.h"


F4NRenderInvoker::F4NRenderInvoker() {

}

F4NRenderInvoker::~F4NRenderInvoker() {

}

void F4NRenderInvoker::newInstance(F4NElement *thisObj) {
    auto **params = new JsiValue *[1];
    params[0] = thisObj->props;

    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_NEW,
           thisObj->tag,
           "<init>",
           1,
           params);
    delete[] params;
}

void F4NRenderInvoker::deleteInstance(F4NElement *thisObj) {
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_DELETE,
           thisObj->tag,
           "<>",
           0,
           nullptr);
}

void F4NRenderInvoker::appendChild(F4NElement *thisObj, F4NElement *child) {
    auto **params = new JsiValue *[1];
    params[0] = new JsiNumber(child->odjId);
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "appendChild",
           1,
           params);

    delete[] params;
}

void F4NRenderInvoker::removeChild(F4NElement *thisObj, F4NElement *child) {
    auto **params = new JsiValue *[1];
    params[0] = new JsiNumber(child->odjId);
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "removeChild",
           1,
           params);
    delete[] params;
}

void F4NRenderInvoker::removeAll(F4NElement *thisObj) {
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "removeAll",
           0,
           nullptr);
}

void F4NRenderInvoker::insertBefore(F4NElement *thisObj, F4NElement *child, F4NElement *anchor) {
    auto **params = new JsiValue *[2];
    params[0] = new JsiNumber(child->odjId);
    params[1] = new JsiNumber(anchor->odjId);
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "insertBefore",
           2,
           params);
    delete[] params;
}

void F4NRenderInvoker::replaceChild(F4NElement *thisObj, F4NElement *newNode, F4NElement *oldNode) {
    auto **params = new JsiValue *[2];
    params[0] = new JsiNumber(newNode->odjId);
    params[1] = new JsiNumber(oldNode->odjId);
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "replaceChild",
           2,
           params);
    delete[] params;
}

void F4NRenderInvoker::setAttributes(F4NElement *thisObj, JsiValue *jsiValue) {
    auto **params = new JsiValue *[1];
    params[0] = jsiValue;
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "setAttributes",
           1,
           params);
    delete[] params;
}

void F4NRenderInvoker::getAttribute(F4NElement *thisObj, string key, F4NFunction *function) {

}

void F4NRenderInvoker::setStyles(F4NElement *thisObj, F4NStyle *hmStyle) {
    auto **params = new JsiValue *[1];
    params[0] = hmStyle->getStyleValue();
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "setStyles",
           1,
           params);
    delete[] params;
}

void F4NRenderInvoker::getReact(F4NElement *thisObj, F4NFunction *hmFunction) {

}

void F4NRenderInvoker::addEventListener(F4NElement *thisObj, string event) {
    auto **params = new JsiValue *[1];
    JsiString *jsiString = new JsiString(event.c_str());
    params[0] = jsiString;
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "addEventListener",
           1,
           params);

    delete jsiString;
    delete[] params;
}

void F4NRenderInvoker::removeEventListener(F4NElement *thisObj, string event) {
    auto **params = new JsiValue *[1];
    params[0] = new JsiString(event.c_str());

    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "removeEventListener",
           1,
           params);
    delete[] params;
}

void F4NRenderInvoker::setEventTarget(F4NComponent *thisObj, F4NEventTarget *eventTarget) {
    auto **params = new JsiValue *[1];
    params[0] = eventTarget->jsiFunction;

    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "setEventTarget",
           1,
           params);
    delete[] params;
}


void F4NRenderInvoker::addAnimation(F4NComponent *thisObj, JsiValue *animation, string key) {
    auto **params = new JsiValue *[2];
    params[0] = animation;
    params[1] = new JsiString(key.c_str());

    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "addAnimation",
           2,
           params);
    delete[] params;
}

void F4NRenderInvoker::removeAnimationForKey(F4NComponent *thisObj, string key) {
    auto **params = new JsiValue *[1];
    params[0] = new JsiString(key.c_str());

    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "removeAnimationForKey",
           1,
           params);
    delete[] params;
}

void F4NRenderInvoker::removeAllAnimation(F4NComponent *thisObj) {
    invoke(FACTORY_TYPE_RENDER,
           thisObj->odjId,
           METHOD_TYPE_CALL,
           thisObj->tag,
           "removeAllAnimation",
           0,
           nullptr);
}


void F4NRenderInvoker::createRender() {

    invoke(FACTORY_TYPE_RENDER,
           2,
           METHOD_TYPE_NEW,
           "Render",
           "<init>",
           0,
           nullptr);

    isCreateRender = true;
}

void F4NRenderInvoker::render(F4NElement *rootElement) {
    if (!isCreateRender) {
        createRender();
    }
    auto **params = new JsiValue *[1];
    params[0] = new JsiNumber(rootElement->odjId);

    invoke(FACTORY_TYPE_RENDER,
           2,
           METHOD_TYPE_CALL,
           "Render",
           "render",
           1,
           params);

    delete[] params;
}

void F4NRenderInvoker::loadScriptWithUrl(string script, JsiFunction *callback) {

    auto **params = new JsiValue *[2];
    params[0] = new JsiString(script.c_str());
    params[0] = callback;

    invoke(FACTORY_TYPE_RENDER,
           -1,
           METHOD_TYPE_CALL,
           "Hummer",
           "loadScriptWithUrl",
           2,
           params);

    delete[] params;
}
