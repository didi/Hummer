//
//  HMImageDecoder.m
//  Hummer
//
//  Created by didi on 2020/11/25.
//

#import "HMImageCoder.h"


HMImageCoderOption const HMImageCoderDecodeFirstFrameOnly = @"decodeFirstFrameOnly";
HMImageCoderOption const HMImageCoderDecodeScaleFactor = @"decodeScaleFactor";
HMImageCoderOption const HMImageCoderDecodePreserveAspectRatio = @"decodePreserveAspectRatio";
HMImageCoderOption const HMImageCoderDecodeThumbnailPixelSize = @"decodeThumbnailPixelSize";

HMImageCoderOption const HMImageCoderEncodeFirstFrameOnly = @"encodeFirstFrameOnly";
HMImageCoderOption const HMImageCoderEncodeCompressionQuality = @"encodeCompressionQuality";
HMImageCoderOption const HMImageCoderEncodeBackgroundColor = @"encodeBackgroundColor";
HMImageCoderOption const HMImageCoderEncodeMaxPixelSize = @"encodeMaxPixelSize";
HMImageCoderOption const HMImageCoderEncodeMaxFileSize = @"encodeMaxFileSize";
HMImageCoderOption const HMImageCoderEncodeEmbedThumbnail = @"encodeEmbedThumbnail";

HMImageCoderOption const HMImageCoderWebImageContext = @"webImageContext";
