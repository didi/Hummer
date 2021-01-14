//
//  HMEncoding.h
//  AfantySDK
//
//  Created by didi on 2020/9/9.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, HMEncodingType) {
    HMEncodingTypeUnknown = 0, ///< unknown
    HMEncodingTypeVoid = 1, ///< void
    HMEncodingTypeBool = 2, ///< bool
    HMEncodingTypeChar = 3, ///< char / BOOL
    HMEncodingTypeUnsignedChar = 4, ///< unsigned char
    HMEncodingTypeShort = 5, ///< short
    HMEncodingTypeUnsignedShort = 6, ///< unsigned short
    HMEncodingTypeInt = 7, ///< int
    HMEncodingTypeUnsignedInt = 8, ///< unsigned int
    HMEncodingTypeLongLong = 9, ///< long long
    HMEncodingTypeUnsignedLongLong = 10, ///< unsigned long long
    HMEncodingTypeFloat = 11, ///< float
    HMEncodingTypeDouble = 12, ///< double
    HMEncodingTypeObject = 13, ///< id
    HMEncodingTypeBlock = 14, ///< block
    HMEncodingTypeLong,
    HMEncodingTypeUnsignedLong
};

FOUNDATION_EXPORT BOOL HMEncodingTypeIsCNumber(HMEncodingType type);

FOUNDATION_EXPORT HMEncodingType HMEncodingGetType(const char *_Nullable typeEncoding);

NS_ASSUME_NONNULL_END
