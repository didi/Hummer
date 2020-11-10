//
//  HMYogaUtility.hpp
//  Hummer
//
//  Created by 唐佳诚 on 2020/9/29.
//

#ifndef HMYogaUtility_hpp
#define HMYogaUtility_hpp

#if __has_include(<yoga/Yoga.h>)
#import <yoga/Yoga.h>
#elif __has_include(<YogaKit/Yoga.h>)
#import <YogaKit/Yoga.h>
#endif

FOUNDATION_EXPORT void hm_yoga_node_free_recursive(const YGNodeRef root);

#endif /* HMYogaUtility_hpp */
