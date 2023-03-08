//
//  HMYogaUtility.hpp
//  Hummer
//
//  Created by 唐佳诚 on 2020/9/29.
//

#ifndef HMYogaUtility_hpp
#define HMYogaUtility_hpp

#if __has_include(<yoga/FINYoga.h>)
#include <yoga/FINYoga.h>
#define YOGA_TYPE_WRAPPER(type) FIN##type
#elif __has_include(<yoga/Yoga.h>)
#include <yoga/Yoga.h>
#define YOGA_TYPE_WRAPPER(type) type
#elif __has_include(<YogaKit/Yoga.h>)
#include <YogaKit/Yoga.h>
#define YOGA_TYPE_WRAPPER(type) type
#endif

FOUNDATION_EXPORT void HMYogaNodeFreeRecursive(const YOGA_TYPE_WRAPPER(YGNodeRef) root);

#endif /* HMYogaUtility_hpp */
