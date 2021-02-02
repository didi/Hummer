//
//  HMYogaUtility.cpp
//  Hummer
//
//  Created by 唐佳诚 on 2020/9/29.
//

#include "HMYogaUtility.h"

extern "C" {
void HMYogaNodeFreeRecursive(const YOGA_TYPE_WRAPPER(YGNodeRef) root) {
    if (!root) {
        assert(false);

        return;
    }
    uint32_t skipped = 0;
    while (YOGA_TYPE_WRAPPER(YGNodeGetChildCount)(root) > skipped) {
        const YOGA_TYPE_WRAPPER(YGNodeRef) child = YOGA_TYPE_WRAPPER(YGNodeGetChild)(root, skipped);
        // 下面的 if 判断只会走一条分支，因为 cloneIfNeeded 是全克隆或者不克隆
        if (YOGA_TYPE_WRAPPER(YGNodeGetOwner)(child) != root) {
            // Don't free shared nodes that we don't own.
            skipped += 1;
        } else {
            // 公司内部 YogaKit 1.7.0 YGNodeRemoveChild 会触发 clone，但是由于前面的注释原因，调用 remove 实际上不会触发 clone
            YOGA_TYPE_WRAPPER(YGNodeRemoveChild)(root, child);
            HMYogaNodeFreeRecursive(child);
        }
    }
    // 剩下都是指向原 owner 的 child，YGNodeFree 会破坏它们，因此需要先 removeAll，removeAll 方法取第一个 child 判断是否 parent/owner 是自身，由于剩下都是 weak 指向的 child，因此直接会 reset vector
    YOGA_TYPE_WRAPPER(YGNodeRemoveAllChildren)(root);
    YOGA_TYPE_WRAPPER(YGNodeFree)(root);
}
}

