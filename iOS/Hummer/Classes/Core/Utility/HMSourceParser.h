//
//  HMResourceModel.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/5/7.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
/// 只支持 main bundle下
@interface HMSourceParser : NSObject

@property (nonatomic, strong) NSBundle *bundle;
@property (nonatomic, copy) NSString *filePath;

@property (nonatomic, copy) NSString *fileName;
@property (nonatomic, copy) NSString *extensionName;


- (instancetype)initWithSource:(NSString *)source;
@end

NS_ASSUME_NONNULL_END
