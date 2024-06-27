//
// Created by didi on 2024/3/14.
//


#include "falcon/ObjectManager.h"


ObjectManager::ObjectManager() {

}

long ObjectManager::createNextId() {
    return ++object_id;
}

void ObjectManager::pushObject(long objId, F4NObject *value) {
    objectMap.insert(make_pair(objId, value));
}

void ObjectManager::pushObject(JsiValue *objId, F4NObject *value) {

}

void ObjectManager::removeObject(long objId) {

}

void ObjectManager::removeAllObject() {
    objectMap.clear();
}

F4NObject *ObjectManager::getObject(long objId) {
    return nullptr;
}

F4NObject *ObjectManager::getObject(JsiValue *objId) {
    return nullptr;
}

void ObjectManager::release() {

}

ObjectManager::~ObjectManager() {

    auto it = objectMap.begin();
    while (it != objectMap.end()) {
        it->second->unprotect();
        it++;
    }
}

