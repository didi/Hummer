//
//  HMTransform.m
//  Hummer
//
//  Created by didi on 2021/2/22.
//

#import "HMTransform.h"

@interface HMTransform()

/* position */
@property (nonatomic, assign, readwrite) float translateX;
@property (nonatomic, assign, readwrite) float translateY;

/* rotate */
@property (nonatomic, assign, readwrite) float rotationX;
@property (nonatomic, assign, readwrite) float rotationY;
@property (nonatomic, assign, readwrite) float rotationZ;

/* scale */
@property (nonatomic, assign, readwrite) float scaleX;
@property (nonatomic, assign, readwrite) float scaleY;

/* skew */
@property (nonatomic, assign, readwrite) CATransform3D skew;

@end

@implementation HMTransform
- (instancetype)init {
    if (self = [super init]) {
        _translateY = 0.0;
        _translateX = 0.0;

        _rotationX = 0.0;
        _rotationY = 0.0;
        _rotationZ = 0.0;
        
        _scaleX = 1.0;
        _scaleY = 1.0;
            
        _skew = CATransform3DIdentity;
    }
    return self;
}
/**
 * position   平移动画
 * scale   缩放动画（x轴和y轴同时）
 * scaleX   缩放动画（x轴）
 * scaleY   缩放动画（y轴）
 * rotationX   旋转动画（x轴）
 * rotationY   旋转动画（y轴）
 * rotationZ   旋转动画（z轴）
 * skew 倾斜动画（x轴和y轴同时）
 */
- (instancetype)initWithKey:(NSString *)key propertyValue:(id)value{
    if (value == nil) {return nil;}
    self = [self init];
    if ([key isEqualToString:@"position"]) {
        CGPoint point = [((NSValue *)value) CGPointValue];
        self.translateX = point.x;
        self.translateY = point.y;
    } else if([key hasPrefix:@"scale"]){
        CGFloat x = 1;
        CGFloat y = 1;
        CGFloat v = [((NSNumber *)value) floatValue];
        if ([key isEqualToString:@"scaleX"]) {
            x = v;
        }else if ([key isEqualToString:@"scaleY"]){
            y = v;
        }else{
            x = v;
            y = v;
        }
        self.scaleX = x;
        self.scaleY = y;
    } else if([key hasPrefix:@"rotation"]){
        [self setValue:value forKey:key];
    } else if ([key isEqualToString:@"skew"]) {
        self.skew = [((NSValue *)value) CATransform3DValue];
    }
    return self;
}

- (instancetype)initWithKey:(NSString *)key propertyValues:(NSArray *)values {
    self = [self initWithKey:key propertyValue:values.lastObject];
    return self;
}

- (HMTransform *)mergeTransform:(HMTransform *)transform withKey:(NSString *)key {
    
    HMTransform *newTransform = [self copy];
    if ([key isEqualToString:@"position"]) {
        newTransform.translateX = transform.translateX;
        newTransform.translateY = transform.translateY;
    }else if ([key isEqualToString:@"scale"]){
        
        newTransform.scaleX = transform.scaleX;
        newTransform.scaleY = transform.scaleY;
    }else if ([key isEqualToString:@"scaleX"]){
        
        newTransform.scaleX = transform.scaleX;
    }else if ([key isEqualToString:@"scaleY"]){
        
        newTransform.scaleY = transform.scaleY;
    }else if ([key hasPrefix:@"rotation"]){
        [newTransform setValue:[transform valueForKey:key] forKey:key];
    }else if ([key isEqualToString:@"skew"]){
        newTransform.skew = transform.skew;
    }
    return newTransform;
}

- (id)copyWithZone:(NSZone *)zone {
    
    HMTransform *transform = [[HMTransform allocWithZone:zone] init];
    transform.translateX = self.translateX;
    transform.translateY = self.translateY;
    transform.scaleY = self.scaleY;
    transform.scaleX = self.scaleX;
    transform.rotationZ = self.rotationZ;
    transform.rotationY = self.rotationY;
    transform.rotationX = self.rotationX;
    transform.skew = self.skew;
    return transform;
}
@end
