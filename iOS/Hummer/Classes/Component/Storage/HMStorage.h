//
//  HMStorage.h
//  Hummer
//
//  Created by UJOY on 2020/2/6.
//  Copyright © 2020 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Hummer/HMStorageProtocol.h>


NS_ASSUME_NONNULL_BEGIN


@interface HMStorageImp : NSObject<HMStorage>
@property (nonatomic, strong, readonly) NSString *path;

- (instancetype)initWithPath:(NSString *)path;
@end

@interface HMStorage : NSObject


@end

NS_ASSUME_NONNULL_END
