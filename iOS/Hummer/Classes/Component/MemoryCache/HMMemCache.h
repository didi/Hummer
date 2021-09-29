//
//  HMMemCache.h
//  Hummer
//
//  Created by UJOY on 2020/2/6.
//  Copyright © 2020 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMMemoryComponent.h>


@interface HMMemCache : NSObject

@end


@interface HMMemoryComponent : NSObject<HMMemoryComponent>
@property (nonatomic, strong, readonly) NSString *namespace;

- (instancetype)initWithNamespace:(NSString *)namespace;
@end
