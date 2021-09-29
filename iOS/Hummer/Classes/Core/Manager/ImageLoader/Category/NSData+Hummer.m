//
//  NSData+Hummer.m
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import "NSData+Hummer.h"
#import <MobileCoreServices/MobileCoreServices.h>
#import "HMImageIOAnimatedCoder+Internal.h"

@implementation NSData (Hummer)
#define HM_kSVGTagEnd @"</svg>"

+ (HMImageFormat)hm_imageFormatForImageData:(nullable NSData *)data {
  
    if (!data) {
        return HMImageFormatUndefined;
    }
    
    // File signatures table: http://www.garykessler.net/library/file_sigs.html
    uint8_t c;
    [data getBytes:&c length:1];
    switch (c) {
        case 0xFF:
            return HMImageFormatJPEG;
        case 0x89:
            return HMImageFormatPNG;
        case 0x47:
            return HMImageFormatGIF;
        case 0x49:
        case 0x4D:
            return HMImageFormatTIFF;
        case 0x52: {
            if (data.length >= 12) {
                //RIFF....WEBP
                NSString *testString = [[NSString alloc] initWithData:[data subdataWithRange:NSMakeRange(0, 12)] encoding:NSASCIIStringEncoding];
                if ([testString hasPrefix:@"RIFF"] && [testString hasSuffix:@"WEBP"]) {
                    return HMImageFormatWebP;
                }
            }
            break;
        }
        case 0x00: {
            if (data.length >= 12) {
                //....ftypheic ....ftypheix ....ftyphevc ....ftyphevx
                NSString *testString = [[NSString alloc] initWithData:[data subdataWithRange:NSMakeRange(4, 8)] encoding:NSASCIIStringEncoding];
                if ([testString isEqualToString:@"ftypheic"]
                    || [testString isEqualToString:@"ftypheix"]
                    || [testString isEqualToString:@"ftyphevc"]
                    || [testString isEqualToString:@"ftyphevx"]) {
                    return HMImageFormatHEIC;
                }
                //....ftypmif1 ....ftypmsf1
                if ([testString isEqualToString:@"ftypmif1"] || [testString isEqualToString:@"ftypmsf1"]) {
                    return HMImageFormatHEIF;
                }
            }
            break;
        }
        case 0x25: {
            if (data.length >= 4) {
                //%PDF
                NSString *testString = [[NSString alloc] initWithData:[data subdataWithRange:NSMakeRange(1, 3)] encoding:NSASCIIStringEncoding];
                if ([testString isEqualToString:@"PDF"]) {
                    return HMImageFormatPDF;
                }
            }
        }
        case 0x3C: {
            // Check end with SVG tag
            if ([data rangeOfData:[HM_kSVGTagEnd dataUsingEncoding:NSUTF8StringEncoding] options:NSDataSearchBackwards range: NSMakeRange(data.length - MIN(100, data.length), MIN(100, data.length))].location != NSNotFound) {
                return HMImageFormatSVG;
            }
        }
    }
    return HMImageFormatUndefined;
}


+ (nonnull CFStringRef)hm_UTTypeFromImageFormat:(HMImageFormat)format {
    CFStringRef UTType;
    switch (format) {
        case HMImageFormatJPEG:
            UTType = kUTTypeJPEG;
            break;
        case HMImageFormatPNG:
            UTType = kUTTypePNG;
            break;
        case HMImageFormatGIF:
            UTType = kUTTypeGIF;
            break;
        case HMImageFormatTIFF:
            UTType = kUTTypeTIFF;
            break;
        case HMImageFormatWebP:
            UTType = kHMUTTypeWebP;
            break;
//        case HMImageFormatHEIC:
//            UTType = kHMUTTypeHEIC;
//            break;
//        case HMImageFormatHEIF:
//            UTType = kHMUTTypeHEIF;
//            break;
        case HMImageFormatPDF:
            UTType = kUTTypePDF;
            break;
        case HMImageFormatSVG:
            UTType = kUTTypeScalableVectorGraphics;
            break;
        default:
            // default is kUTTypeImage abstract type
            UTType = kUTTypeImage;
            break;
    }
    return UTType;
}

+ (HMImageFormat)hm_imageFormatFromUTType:(CFStringRef)uttype {
    if (!uttype) {
        return HMImageFormatUndefined;
    }
    HMImageFormat imageFormat;
    if (CFStringCompare(uttype, kUTTypeJPEG, 0) == kCFCompareEqualTo) {
        imageFormat = HMImageFormatJPEG;
    } else if (CFStringCompare(uttype, kUTTypePNG, 0) == kCFCompareEqualTo) {
        imageFormat = HMImageFormatPNG;
    } else if (CFStringCompare(uttype, kUTTypeGIF, 0) == kCFCompareEqualTo) {
        imageFormat = HMImageFormatGIF;
    } else if (CFStringCompare(uttype, kUTTypeTIFF, 0) == kCFCompareEqualTo) {
        imageFormat = HMImageFormatTIFF;
    } else if (CFStringCompare(uttype, kHMUTTypeWebP, 0) == kCFCompareEqualTo) {
        imageFormat = HMImageFormatWebP;
//    } else if (CFStringCompare(uttype, kHMUTTypeHEIC, 0) == kCFCompareEqualTo) {
//        imageFormat = HMImageFormatHEIC;
//    } else if (CFStringCompare(uttype, kHMUTTypeHEIF, 0) == kCFCompareEqualTo) {
//        imageFormat = HMImageFormatHEIF;
    } else if (CFStringCompare(uttype, kUTTypePDF, 0) == kCFCompareEqualTo) {
        imageFormat = HMImageFormatPDF;
    } else if (CFStringCompare(uttype, kUTTypeScalableVectorGraphics, 0) == kCFCompareEqualTo) {
        imageFormat = HMImageFormatSVG;
    } else {
        imageFormat = HMImageFormatUndefined;
    }
    return imageFormat;
}

@end
