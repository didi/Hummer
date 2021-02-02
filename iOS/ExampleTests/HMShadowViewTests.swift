//
//  HMShadowViewTests.swift
//  ExampleTests
//
//  Created by 唐佳诚 on 2021/1/7.
//

import Quick
import Nimble
import Hummer
import yoga

private final class HMShadowViewTests: QuickSpec {

    override func spec() {
        var parentView: HMRenderObject?

        func _shadowView(configBlock: (YGNodeRef) -> Void) -> HMRenderObject {
            let shadowView = HMRenderObject()
            configBlock(shadowView.yogaNode)

            return shadowView
        }

        func _withShadowView(configBlock: (YGNodeRef) -> Void, assertRelativeLayout expectedRect: CGRect, withIntrinsicContentSize contentSize: CGSize) {
            let view = _shadowView(configBlock: configBlock)
            parentView?.insertSubview(view, at: 0)
            view.intrinsicContentSize = contentSize
            let rootShadowView = HMRootRenderObject()
            rootShadowView.renderObject = parentView
            rootShadowView.layout(withAffectedShadowViews: NSHashTable.weakObjects())
            expect(parentView).notTo(beNil())
            guard let parentView = parentView else {
                return
            }
            let actualRect = view.measureLayoutRelative(toAncestor: parentView)
            expect(actualRect == expectedRect).to(beTrue(), description: "Expected layout to be \(expectedRect), got \(actualRect)")
        }

        beforeEach {
            parentView = HMRenderObject()
            YGNodeStyleSetWidth(parentView?.yogaNode, 440)
            YGNodeStyleSetHeight(parentView?.yogaNode, 440)
        }
        
        it("testPercentWidthOrHeightSizeThatFits") {
            YGNodeStyleSetWidthPercent(parentView?.yogaNode, 100)
            YGNodeStyleSetHeightPercent(parentView?.yogaNode, 100)
            let topView = _shadowView { (node) in
                YGNodeStyleSetWidth(node, 100)
                YGNodeStyleSetHeight(node, 100)
            }
            
            let centerView = _shadowView { (node) in
                YGNodeStyleSetWidth(node, 150)
                YGNodeStyleSetHeight(node, 100)
            }
            
            let bottomView = _shadowView { (node) in
                YGNodeStyleSetWidth(node, 200)
                YGNodeStyleSetHeight(node, 100)
            }
            parentView?.insertSubview(topView, at: 0)
            parentView?.insertSubview(centerView, at: 1)
            parentView?.insertSubview(bottomView, at: 2)
            let size = parentView?.sizeThatFitsMinimumSize(CGSize(width: 0, height: 0), maximumSize: CGSize(width: CGFloat.greatestFiniteMagnitude, height: CGFloat.greatestFiniteMagnitude))
            expect(size == CGSize(width: 200, height: 300)).to(beTrue())
        }
        
        it("testFlexWrapSizeThatFits") {
            let layoutView = _shadowView { (node) in
                YGNodeStyleSetFlexWrap(node, .wrap)
                YGNodeStyleSetFlexDirection(node, .row)
            }
            
            let topView = _shadowView { (node) in
                YGNodeStyleSetWidth(node, 300)
                YGNodeStyleSetHeight(node, 100)
            }
            
            let centerView = _shadowView { (node) in
                YGNodeStyleSetWidth(node, 300)
                YGNodeStyleSetHeight(node, 100)
            }
            
            let bottomView = _shadowView { (node) in
                YGNodeStyleSetWidth(node, 300)
                YGNodeStyleSetHeight(node, 100)
            }
            layoutView.insertSubview(topView, at: 0)
            layoutView.insertSubview(centerView, at: 1)
            layoutView.insertSubview(bottomView, at: 2)
            let size = layoutView.sizeThatFitsMinimumSize(CGSize(width: 0, height: 0), maximumSize: CGSize(width: 400, height: CGFloat.greatestFiniteMagnitude))
            expect(size == CGSize(width: 400, height: 300)).to(beTrue())
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
        it("testApplyingLayoutRecursivelyToShadowView") {
            let leftView = _shadowView { (node) in
                YGNodeStyleSetFlex(node, 1)
            }
            let centerView = _shadowView { (node) in
                YGNodeStyleSetFlex(node, 2)
                YGNodeStyleSetMargin(node, .left, 10)
                YGNodeStyleSetMargin(node, .right, 10)
            }
            let rightView = _shadowView { (node) in
                YGNodeStyleSetFlex(node, 1)
            }
            let mainView = _shadowView { (node) in
                YGNodeStyleSetFlexDirection(node, .row)
                YGNodeStyleSetFlex(node, 2)
                YGNodeStyleSetMargin(node, .top, 10)
                YGNodeStyleSetMargin(node, .bottom, 10)
            }
            mainView.insertSubview(leftView, at: 0)
            mainView.insertSubview(centerView, at: 1)
            mainView.insertSubview(rightView, at: 2)
            let headerView = _shadowView { (node: YGNodeRef) in
                YGNodeStyleSetFlex(node, 1)
            }
            let footerView = _shadowView { (node: YGNodeRef) in
                YGNodeStyleSetFlex(node, 1)
            }
            YGNodeStyleSetPadding(parentView?.yogaNode, .left, 10)
            YGNodeStyleSetPadding(parentView?.yogaNode, .top, 10)
            YGNodeStyleSetPadding(parentView?.yogaNode, .right, 10)
            YGNodeStyleSetPadding(parentView?.yogaNode, .bottom, 10)
            parentView?.insertSubview(headerView, at: 0)
            parentView?.insertSubview(mainView, at: 1)
            parentView?.insertSubview(footerView, at: 2)
            let rootShadowView = HMRootRenderObject()
            rootShadowView.renderObject = parentView
            rootShadowView.layout(withAffectedShadowViews: NSHashTable.weakObjects())
            expect(parentView).notTo(beNil())
            guard let parentView = parentView else {
                return
            }
            expect(parentView.measureLayoutRelative(toAncestor: parentView) == CGRect(x: 0, y: 0, width: 440, height: 440)).to(beTrue())
            expect(parentView.paddingAsInsets == UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)).to(beTrue())
            expect(headerView.measureLayoutRelative(toAncestor: parentView) == CGRect(x: 10, y: 10, width: 420, height: 100)).to(beTrue())
            expect(mainView.measureLayoutRelative(toAncestor: parentView) == CGRect(x: 10, y: 120, width: 420, height: 200)).to(beTrue())
            expect(footerView.measureLayoutRelative(toAncestor: parentView) == CGRect(x: 10, y: 330, width: 420, height: 100)).to(beTrue())
            expect(leftView.measureLayoutRelative(toAncestor: parentView) == CGRect(x: 10, y: 120, width: 100, height: 200)).to(beTrue())
            expect(centerView.measureLayoutRelative(toAncestor: parentView) == CGRect(x: 120, y: 120, width: 200, height: 200)).to(beTrue())
            expect(rightView.measureLayoutRelative(toAncestor: parentView) == CGRect(x: 330, y: 120, width: 100, height: 200)).to(beTrue())
        }

        it("testAncestorCheck") {
            let centerView = _shadowView { (node) in
                YGNodeStyleSetFlex(node, 1)
            }
            let mainView = _shadowView { (node) in
                YGNodeStyleSetFlex(node, 1)
            }
            mainView.insertSubview(centerView, at: 0)
            let footerView = _shadowView { (node) in
                YGNodeStyleSetFlex(node, 1)
            }
            parentView?.insertSubview(mainView, at: 0)
            parentView?.insertSubview(footerView, at: 1)
            expect(centerView.viewIsDescendant(of: mainView)).to(beTrue())
            expect(footerView.viewIsDescendant(of: mainView)).to(beFalse())
        }

        it("testAssignsSuggestedWidthDimension") {
            _withShadowView(configBlock: { (node) in
                YGNodeStyleSetPositionType(node, .absolute)
                YGNodeStyleSetPosition(node, .left, 0)
                YGNodeStyleSetPosition(node, .top, 0)
                YGNodeStyleSetHeight(node, 10)
            }, assertRelativeLayout: CGRect(x: 0, y: 0, width: 3, height: 10), withIntrinsicContentSize: CGSize(width: 3, height: UIView.noIntrinsicMetric))
        }

        it("testAssignsSuggestedHeightDimension") {
            _withShadowView(configBlock: { (node) in
                YGNodeStyleSetPositionType(node, .absolute)
                YGNodeStyleSetPosition(node, .left, 0)
                YGNodeStyleSetPosition(node, .top, 0)
                YGNodeStyleSetWidth(node, 10)
            }, assertRelativeLayout: CGRect(x: 0, y: 0, width: 10, height: 4), withIntrinsicContentSize: CGSize(width: UIView.noIntrinsicMetric, height: 4))
        }

        it("testDoesNotOverrideDimensionStyleWithSuggestedDimensions") {
            _withShadowView(configBlock: { (node) in
                YGNodeStyleSetPositionType(node, .absolute)
                YGNodeStyleSetPosition(node, .left, 0)
                YGNodeStyleSetPosition(node, .top, 0)
                YGNodeStyleSetWidth(node, 10)
                YGNodeStyleSetHeight(node, 10)
            }, assertRelativeLayout: CGRect(x: 0, y: 0, width: 10, height: 10), withIntrinsicContentSize: CGSize(width: 3, height: 4))
        }

        it("testDoesNotAssignSuggestedDimensionsWhenStyledWithFlexAttribute") {
            let parentWidth = YGNodeStyleGetWidth(parentView?.yogaNode).value
            let parentHeight = YGNodeStyleGetHeight(parentView?.yogaNode).value
            _withShadowView(configBlock: { (node) in
                YGNodeStyleSetFlex(node, 1)
            }, assertRelativeLayout: CGRect(x: 0, y: 0, width: CGFloat(parentWidth), height: CGFloat(parentHeight)), withIntrinsicContentSize: CGSize(width: 3, height: 4))
        }
    }
}
