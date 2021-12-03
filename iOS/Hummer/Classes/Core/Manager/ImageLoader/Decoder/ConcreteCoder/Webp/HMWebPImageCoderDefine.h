//
//  HMWebPImageCoderDefine.h
//  Hummer
//
//  Created by didi on 2021/9/1.
//

#import <Foundation/Foundation.h>
#import "HMImageCoderManager.h"

NS_ASSUME_NONNULL_BEGIN

/**
Integer value
Quality/speed trade-off (0=fast, 6=slower-better)
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPMethod;

/**
Integer value
Number of entropy-analysis passes (in [1..10])
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPPass;

/**
 Integer value
 Preprocessing filter (0=none, 1=segment-smooth)
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPPreprocessing;

/**
 Float value
 if non-zero, specifies the minimal distortion to try to achieve. Takes precedence over target_size.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPTargetPSNR;

/**
 Integer value
 If non-zero, try and use multi-threaded encoding.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPThreadLevel;

/**
 Integer value
 If set, reduce memory usage (but increase CPU use).
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPLowMemory;

/**
 Integer value
 if non-zero, specifies the minimal distortion to try to achieve. Takes precedence over target_size.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPSegments;

/**
 Integer value
 Spatial Noise Shaping. 0=off, 100=maximum.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPSnsStrength;

/**
 Integer value
 Range: [0 = off .. 100 = strongest]
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPFilterStrength;

/**
 Integer value
 range: [0 = off .. 7 = least sharp]
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPFilterSharpness;

/**
 Integer value
 Filtering type: 0 = simple, 1 = strong (only used If filter_strength > 0 or autofilter > 0)
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPFilterType;

/**
 Integer value
 Auto adjust filter's strength [0 = off, 1 = on]
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPAutofilter;

/**
 Integer value
 Algorithm for encoding the alpha plane (0 = none, 1 = compressed with WebP lossless). Default is 1.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPAlphaCompression;

/**
 Integer value
 Predictive filtering method for alpha plane. 0: none, 1: fast, 2: best. Default if 1.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPAlphaFiltering;

/**
 Integer value
 Between 0 (smallest size) and 100 (lossless).
 Default is 100.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPAlphaQuality;

/**
 Integer value
 If true, export the compressed picture back.
 In-loop filtering is not applied.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPShowCompressed;

/**
 Integer
 Log2(number of token partitions) in [0..3]
 Default is set to 0 for easier progressive decoding.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPPartitions;

/**
 Integer value
 Quality degradation allowed to fit the 512k limit on
 Prediction modes coding (0: no degradation, 100: maximum possible degradation).
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPPartitionLimit;

/**
 Integer value
 if needed, use sharp (and slow) RGB->YUV conversion
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeWebPUseSharpYuv;
NS_ASSUME_NONNULL_END
