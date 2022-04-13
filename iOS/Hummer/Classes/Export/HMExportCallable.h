//
//  HMExportCallable.h
//  Hummer
//
//  Created by didi on 2022/4/6.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMExportMethodMetaData <NSObject>
@property (nonatomic, nullable, copy) NSString *jsFieldName;

- (nullable SEL)getTestSelector;
@end

NS_ASSUME_NONNULL_END
