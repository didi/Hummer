//
// Created by didi on 2023/11/22.
//

#include "hvdom/hm_object_pools.h"




HMObjectPools::HMObjectPools() {
    objectPools_ = set<HMValue*>();
}

void HMObjectPools::protect(HMValue *value) {
    auto it = objectPools_.find(value);
    if (it == objectPools_.end()) {
        objectPools_.insert(value);
    }
}

void HMObjectPools::unprotect(HMValue *value) {
    objectPools_.erase(value);
}
