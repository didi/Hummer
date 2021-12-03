//
//  HMImageLoaderDefine.m
//  Hummer
//
//  Created by didi on 2020/11/23.
//

#import "HMImageLoaderDefine.h"

NSErrorDomain const _Nonnull HMWebImageErrorDomain = @"HMWebImageErrorDomain";
NSErrorUserInfoKey const _Nonnull HMWebImageErrorDownloadStatusCodeKey = @"HMWebImageErrorDownloadStatusCodeKey";


HMImageLoaderContextOption const HMImageManagerContextNamespace = @"HMImageNamespaceKey";
HMImageLoaderContextOption const HMImageManagerContextAnimatedImageClass = @"animatedImageClass";
HMImageLoaderContextOption const HMImageManagerContextImageTransformer = @"imageTransformer";

//decoder
HMImageLoaderContextOption const HMImageManagerContextImageScaleFactor = @"imageScaleFactor";
HMImageLoaderContextOption const HMImageManagerContextImageResizeMode = @"imageResizeMode";

HMImageLoaderContextOption const HMImageManagerContextImageThumbnailPixelSize = @"thumbnailPixelSize";

