//
//  HMExportCallable.h
//  Hummer
//
//  Created by didi on 2022/4/6.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMExportMethodBase <NSObject>
@property (nonatomic, nullable, copy) NSString *jsFieldName;

- (nullable SEL)getTestSelector;
@end


/**
 * 解析之后产物：
 * 1. js 方法/属性名。
 * 2. oc selector，如果是属性，则为 setter & getter
 * 3. 参数类型。
 */

@protocol HMExportMethodParsable <HMExportMethodBase>

/**
 *  当该协议被 HMExportMethod 实现时，unparseToken 值如下
 *  1. - (NSString *)function:(NSString *)param;    完整格式。
 *
 *  当该协议被 HMExportProperty 实现时，unparseToken 值为属性参数类型，如 NSString *
 */
@property (nonatomic, nullable, copy) NSString *unparseToken;

/// flag '-'或'+'
@property (nonatomic, nullable, copy) NSString *flag;


/// @return YES：参数具体化，NO：原始方案(只有selector，无参数类型)
- (BOOL)optimizable;


- (void)parse;
@end


NS_ASSUME_NONNULL_END
