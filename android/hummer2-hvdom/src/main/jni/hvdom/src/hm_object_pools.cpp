////
//// Created by didi on 2023/11/22.
////
//
//#include "hvdom/hm_object_pools.h"
//
//
//
//
//HMObjectPools::HMObjectPools() {
//    objectPools_ = set<JsiValue*>();
//}
//
//void HMObjectPools::protect(JsiValue *value) {
//    auto it = objectPools_.find(value);
//    if (it == objectPools_.end()) {
//        objectPools_.insert(value);
//    }
//}
//
//void HMObjectPools::unprotect(JsiValue *value) {
//    objectPools_.erase(value);
//}
