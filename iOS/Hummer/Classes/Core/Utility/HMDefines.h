//
//  HMDefines.h
//  Hummer
//
//  Created by didi on 2021/12/24.
//

#import <Foundation/Foundation.h>
#define HM_SafeRunBlock(block,...)       ((block)?(block(__VA_ARGS__)):nil)


FOUNDATION_EXPORT NSErrorDomain const _Nonnull HMUrlSessionErrorDomain;

