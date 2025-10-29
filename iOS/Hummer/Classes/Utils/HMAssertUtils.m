//
//  HMAssertUtils.m
//  Hummer
//
//  Created by GY on 2024/10/29.
//

#import "HMAssertUtils.h"

void _HMAssert(NSString *func, NSString *file, int lineNum, NSString *format, ...) {
    va_list args;
    va_start(args, format);
    NSString *message = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);
    
    [[NSAssertionHandler currentHandler] handleFailureInFunction:func
                                                            file:file
                                                      lineNumber:lineNum
                                                     description:@"%@", message];
}

@implementation HMAssertUtils

@end
