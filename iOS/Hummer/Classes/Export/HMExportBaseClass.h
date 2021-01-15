//
//  HMExportBaseClass.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/6/28.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMExportBaseClass : NSObject

@property (nonatomic, nullable, copy) NSString *jsFieldName;

- (nullable SEL)getTestSelector;

@end

NS_ASSUME_NONNULL_END
