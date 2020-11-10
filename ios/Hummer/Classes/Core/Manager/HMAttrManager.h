//
//  HMAttrManager.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface HMViewAttribute : NSObject

+ (instancetype)viewAttrWithName:(NSString *)viewProp
                         cssAttr:(NSString *)cssAttr
                       converter:(SEL)converter;
@end

#define HM_EXPORT_ATTRIBUTE(attr, vprop, conv) \
+ (HMViewAttribute *)__hm_view_attribute_##attr##__ {\
    return [HMViewAttribute viewAttrWithName:@#vprop cssAttr:@#attr converter:@selector(conv)];\
}

@interface HMAttrManager : NSObject

+ (instancetype)sharedManager;

- (void)loadViewAttrForClass:(Class)clazz;

- (SEL)converterWithCSSAttr:(NSString *)cssAttr;

- (NSString *)viewPropWithCSSAttr:(NSString *)cssAttr;

@end
