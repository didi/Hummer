//
//  HMRenderObjectTests.m
//  ExampleTests
//
//  Created by 唐佳诚 on 2020/10/27.
//  Copyright © 2020 Warmbloom. All rights reserved.
//

#import <XCTest/XCTest.h>

#import <Hummer/HMRenderObject.h>
#import <Hummer/HMRenderObject+RootObject.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMRenderObjectTests : XCTestCase

@property (nonatomic, strong) HMRenderObject *parentView;

- (HMRenderObject *)_shadowViewWithConfig:(void (^)(YGNodeRef node))configBlock;

- (void)_withShadowViewWithStyle:(void (^)(YGNodeRef node))configBlock
            assertRelativeLayout:(CGRect)expectedRect
        withIntrinsicContentSize:(CGSize)contentSize;

@end

NS_ASSUME_NONNULL_END

@implementation HMRenderObjectTests

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.
    self.parentView = [HMRenderObject new];
    YGNodeStyleSetFlexDirection(self.parentView.yogaNode, YGFlexDirectionColumn);
    YGNodeStyleSetWidth(self.parentView.yogaNode, 440);
    YGNodeStyleSetHeight(self.parentView.yogaNode, 440);
//    self.parentView.reactTag = @1; // must be valid rootView tag
}

// Just a basic sanity test to ensure css-layout is applied correctly in the context of our shadow view hierarchy.
//
// ====================================
// ||             header             ||
// ====================================
// ||       ||              ||       ||
// || left  ||    center    || right ||
// ||       ||              ||       ||
// ====================================
// ||             footer             ||
// ====================================
//
- (void)testApplyingLayoutRecursivelyToShadowView {
    HMRenderObject *leftView = [self _shadowViewWithConfig:^(YGNodeRef node) {
        YGNodeStyleSetFlex(node, 1);
    }];

    HMRenderObject *centerView = [self _shadowViewWithConfig:^(YGNodeRef node) {
        YGNodeStyleSetFlex(node, 2);
        YGNodeStyleSetMargin(node, YGEdgeLeft, 10);
        YGNodeStyleSetMargin(node, YGEdgeRight, 10);
    }];

    HMRenderObject *rightView = [self _shadowViewWithConfig:^(YGNodeRef node) {
        YGNodeStyleSetFlex(node, 1);
    }];

    HMRenderObject *mainView = [self _shadowViewWithConfig:^(YGNodeRef node) {
        YGNodeStyleSetFlexDirection(node, YGFlexDirectionRow);
        YGNodeStyleSetFlex(node, 2);
        YGNodeStyleSetMargin(node, YGEdgeTop, 10);
        YGNodeStyleSetMargin(node, YGEdgeBottom, 10);
    }];

    [mainView insertSubview:leftView atIndex:0];
    [mainView insertSubview:centerView atIndex:1];
    [mainView insertSubview:rightView atIndex:2];

    HMRenderObject *headerView = [self _shadowViewWithConfig:^(YGNodeRef node) {
        YGNodeStyleSetFlex(node, 1);
    }];

    HMRenderObject *footerView = [self _shadowViewWithConfig:^(YGNodeRef node) {
        YGNodeStyleSetFlex(node, 1);
    }];

    YGNodeStyleSetPadding(self.parentView.yogaNode, YGEdgeLeft, 10);
    YGNodeStyleSetPadding(self.parentView.yogaNode, YGEdgeTop, 10);
    YGNodeStyleSetPadding(self.parentView.yogaNode, YGEdgeRight, 10);
    YGNodeStyleSetPadding(self.parentView.yogaNode, YGEdgeBottom, 10);

    [self.parentView insertSubview:headerView atIndex:0];
    [self.parentView insertSubview:mainView atIndex:1];
    [self.parentView insertSubview:footerView atIndex:2];

    [self.parentView layoutWithAffectedShadowViews:[NSHashTable weakObjectsHashTable]];

    XCTAssertTrue(CGRectEqualToRect([self.parentView measureLayoutRelativeToAncestor:self.parentView], CGRectMake(0, 0, 440, 440)));
    XCTAssertTrue(UIEdgeInsetsEqualToEdgeInsets([self.parentView paddingAsInsets], UIEdgeInsetsMake(10, 10, 10, 10)));

    XCTAssertTrue(CGRectEqualToRect([headerView measureLayoutRelativeToAncestor:self.parentView], CGRectMake(10, 10, 420, 100)));
    XCTAssertTrue(CGRectEqualToRect([mainView measureLayoutRelativeToAncestor:self.parentView], CGRectMake(10, 120, 420, 200)));
    XCTAssertTrue(CGRectEqualToRect([footerView measureLayoutRelativeToAncestor:self.parentView], CGRectMake(10, 330, 420, 100)));

    XCTAssertTrue(CGRectEqualToRect([leftView measureLayoutRelativeToAncestor:self.parentView], CGRectMake(10, 120, 100, 200)));
    XCTAssertTrue(CGRectEqualToRect([centerView measureLayoutRelativeToAncestor:self.parentView], CGRectMake(120, 120, 200, 200)));
    XCTAssertTrue(CGRectEqualToRect([rightView measureLayoutRelativeToAncestor:self.parentView], CGRectMake(330, 120, 100, 200)));
}

- (void)testAncestorCheck {
    HMRenderObject *centerView = [self _shadowViewWithConfig:^(YGNodeRef node) {
        YGNodeStyleSetFlex(node, 1);
    }];

    HMRenderObject *mainView = [self _shadowViewWithConfig:^(YGNodeRef node) {
        YGNodeStyleSetFlex(node, 1);
    }];

    [mainView insertSubview:centerView atIndex:0];

    HMRenderObject *footerView = [self _shadowViewWithConfig:^(YGNodeRef node) {
        YGNodeStyleSetFlex(node, 1);
    }];

    [self.parentView insertSubview:mainView atIndex:0];
    [self.parentView insertSubview:footerView atIndex:1];

    XCTAssertTrue([centerView viewIsDescendantOf:mainView]);
    XCTAssertFalse([footerView viewIsDescendantOf:mainView]);
}

- (void)testAssignsSuggestedWidthDimension {
    [self _withShadowViewWithStyle:^(YGNodeRef node) {
                YGNodeStyleSetPositionType(node, YGPositionTypeAbsolute);
                YGNodeStyleSetPosition(node, YGEdgeLeft, 0);
                YGNodeStyleSetPosition(node, YGEdgeTop, 0);
                YGNodeStyleSetHeight(node, 10);
            }
              assertRelativeLayout:CGRectMake(0, 0, 3, 10)
          withIntrinsicContentSize:CGSizeMake(3, UIViewNoIntrinsicMetric)];
}

- (void)testAssignsSuggestedHeightDimension {
    [self _withShadowViewWithStyle:^(YGNodeRef node) {
                YGNodeStyleSetPositionType(node, YGPositionTypeAbsolute);
                YGNodeStyleSetPosition(node, YGEdgeLeft, 0);
                YGNodeStyleSetPosition(node, YGEdgeTop, 0);
                YGNodeStyleSetWidth(node, 10);
            }
              assertRelativeLayout:CGRectMake(0, 0, 10, 4)
          withIntrinsicContentSize:CGSizeMake(UIViewNoIntrinsicMetric, 4)];
}

- (void)testDoesNotOverrideDimensionStyleWithSuggestedDimensions {
    [self _withShadowViewWithStyle:^(YGNodeRef node) {
                YGNodeStyleSetPositionType(node, YGPositionTypeAbsolute);
                YGNodeStyleSetPosition(node, YGEdgeLeft, 0);
                YGNodeStyleSetPosition(node, YGEdgeTop, 0);
                YGNodeStyleSetWidth(node, 10);
                YGNodeStyleSetHeight(node, 10);
            }
              assertRelativeLayout:CGRectMake(0, 0, 10, 10)
          withIntrinsicContentSize:CGSizeMake(3, 4)];
}

- (void)testDoesNotAssignSuggestedDimensionsWhenStyledWithFlexAttribute {
    float parentWidth = YGNodeStyleGetWidth(self.parentView.yogaNode).value;
    float parentHeight = YGNodeStyleGetHeight(self.parentView.yogaNode).value;
    [self _withShadowViewWithStyle:^(YGNodeRef node) {
                YGNodeStyleSetFlex(node, 1);
            }
              assertRelativeLayout:CGRectMake(0, 0, parentWidth, parentHeight)
          withIntrinsicContentSize:CGSizeMake(3, 4)];
}

- (void)_withShadowViewWithStyle:(void (^)(YGNodeRef node))configBlock
            assertRelativeLayout:(CGRect)expectedRect
        withIntrinsicContentSize:(CGSize)contentSize {
    HMRenderObject *view = [self _shadowViewWithConfig:configBlock];
    [self.parentView insertSubview:view atIndex:0];
    view.intrinsicContentSize = contentSize;
    [self.parentView layoutWithAffectedShadowViews:[NSHashTable weakObjectsHashTable]];
    CGRect actualRect = [view measureLayoutRelativeToAncestor:self.parentView];
    XCTAssertTrue(CGRectEqualToRect(expectedRect, actualRect),
            @"Expected layout to be %@, got %@",
            NSStringFromCGRect(expectedRect),
            NSStringFromCGRect(actualRect));
}

- (HMRenderObject *)_shadowViewWithConfig:(void (^)(YGNodeRef node))configBlock {
    HMRenderObject *shadowView = [HMRenderObject new];
    configBlock(shadowView.yogaNode);
    return shadowView;
}

@end
