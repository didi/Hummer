//
//  HMAttributesBuilder.h
//  Hummer
//
//  Created by didi on 2020/3/1.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class HMAttributesBuilder;

@protocol HMAttributesBuilderDelegate <NSObject>

- (void)attributesBuilder:(HMAttributesBuilder *)builder didUpdateAttributedString:(NSAttributedString *)string;

@end

/// 该类结合了数据源和生产商的作用，能够基于原始数据源构造一个 NSAttributedString 实例，并不多更新之；
///
@interface HMAttributesBuilder : NSObject

// MARK: Begin - Global common styles

@property (nonatomic, strong, readonly) UIFont *font;

@property (nonatomic, copy, readonly, nullable) NSDictionary *textDecoration;

@property (nonatomic, copy, readonly, nullable) NSDictionary *letterSpacing;

@property (nonatomic, strong, readonly, nullable) NSMutableParagraphStyle *paragraphStyle;

// MARK: End - Global common styles

/// 通过设置代理，可以不断获取构造结果的更新
///
@property (nonatomic, weak, nullable) id<HMAttributesBuilderDelegate> delegate;

- (instancetype)initWithFont:(UIFont *)font textDecoration:(nullable NSDictionary *)textDecoration letterSpacing:(nullable NSDictionary *)letterSpacing paragraphStyle:(nullable NSMutableParagraphStyle *)paragraphStyle;

/// 构建一个 NSAttributedString 实例；
///
/// 如果存在图片，则当图片下载完成后，结果需要被更新，该类会通知其代理发出消息。
///
- (nullable NSAttributedString *)buildAttributedString:(NSArray *)data;

- (void)updateFont:(UIFont *)font;

- (void)updateTextDecoration:(NSDictionary *)textDecoration;

- (void)updateLetterSpacing:(NSDictionary *)letterSpacing;

- (void)updateParagraphStyle:(NSMutableParagraphStyle *)paragraphStyle;

- (void)clear;

// MARK: Search

- (nullable NSString *)linkAtIndex:(NSUInteger)index;

@end

NS_ASSUME_NONNULL_END
