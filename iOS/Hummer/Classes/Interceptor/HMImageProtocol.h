//
//  HMImageProtocol.h
//  Hummer
//
//  Created by didi on 2020/5/21.
//

#ifndef HMImageProtocol_h
#define HMImageProtocol_h

@class UIImage;

@protocol HMImageProtocol <NSObject>
@optional

/// If a nonull image returned,  it will be used.
- (UIImage *)imageView:(id)imgView willSetImage:(UIImage *)image src:(NSString *)src;

@end

#endif /* HMImageProtocol_h */
