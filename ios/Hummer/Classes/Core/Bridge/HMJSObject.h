//
//  HMJSObject.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>

@protocol HMJSObject <NSObject>

@optional
/**
 * 复制方法（对象如果是 Native 创建，导出给前端使用的情况下，需要实现该方法）
 * @param object : 同类型对象
 **/
- (void)copyFromObject:(id)object;

@required

- (instancetype)initWithHMValues:(NSArray *)values;

@optional

- (void)callFinialize;

@end
