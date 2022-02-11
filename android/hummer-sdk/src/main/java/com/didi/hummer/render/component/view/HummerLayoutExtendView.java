package com.didi.hummer.render.component.view;

import android.content.Context;

import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.style.HummerLayout;
import com.didi.hummer.render.style.HummerLayoutExtendUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author: daiyibo
 * @date: 2020/2/29
 * @desc: 自定义布局View，用于实现display:block、inline、inline-block；position:fixed效果
 */
public abstract class HummerLayoutExtendView extends HMBase<HummerLayout>
        implements HMBase.PositionChangedListener, HMBase.DisplayChangedListener {

    private HummerContext hummerContext;
    private List<InlineBox> inlineBoxes = new ArrayList<>();
    private Map<HMBase, FixedNoneBox> fixedNoneBoxMap = new HashMap<>();
    private List<HMBase> children = new LinkedList<>();

    public HummerLayoutExtendView(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
        hummerContext = context;
    }

    @Override
    protected HummerLayout createViewInstance(Context context) {
        return new HummerLayout(context);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        getView().setCornerRadiiGetter(() -> backgroundHelper.getBorderRadii());
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        // 这里在post中处理释放子控件的逻辑，是为了避免在GC流程中触发GC导致crash的问题
        getView().post(() -> {
            // 释放所有子控件
            if (!children.isEmpty()) {
                for (HMBase child : children) {
                    if (child != null && child.getJSValue() != null) {
                        child.getJSValue().unprotect();
                    }
                }
                children.clear();
            }
        });
    }

    public void appendChild(HMBase child) {
        if (child == null) {
            return;
        }

        child.getJSValue().protect();
        child.setPositionChangedListener(this);
        child.setDisplayChangedListener(this);
        children.add(child);
        HMBase finalChild = child;

        // 支持 position:fixed 布局样式，添加至窗口视图
        if (child.getPosition() == HummerLayoutExtendUtils.Position.FIXED) {
            hummerContext.getContainer().addView(child);
            FixedNoneBox fixedNoneBox = new FixedNoneBox(hummerContext);
            fixedNoneBoxMap.put(child, fixedNoneBox);
            finalChild = fixedNoneBox;
        }

        // 支持 display:inline 布局样式，外部扩展横向flex布局
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK) {
            HummerLayoutExtendUtils.markExtendCssView(child);
            if ((child.getDisplay() == HummerLayoutExtendUtils.Display.INLINE
                    || child.getDisplay() == HummerLayoutExtendUtils.Display.INLINE_BLOCK)) {
                HMBase lastChild = getView().getLastChild();
                if (lastChild instanceof InlineBox) {
                    child.setInlineBox((InlineBox) lastChild);
                    ((InlineBox) lastChild).add(child);
                    finalChild = null;
                } else {
                    InlineBox box = new InlineBox(hummerContext);
                    child.setInlineBox(box);
                    box.add(child);
                    inlineBoxes.add(box);
                    finalChild = box;
                }
            }
        }

        // 扩展样式处理
        if (HummerLayoutExtendUtils.isExtendCssView(child)) {
            HummerLayoutExtendUtils.applyChildDisplayStyle(getDisplay().value(), child);
        }

        // 默认处理
        if (finalChild != null) {
            getView().addView(finalChild);
        }
    }

    public void removeChild(HMBase child) {
        if (child == null) {
            return;
        }

        child.getJSValue().unprotect();
        child.setPositionChangedListener(null);
        child.setDisplayChangedListener(null);
        children.remove(child);

        // inline box 事件透传
        if (child.getInlineBox() != null) {
            InlineBox inlineBox = child.getInlineBox();
            inlineBox.remove(child);
            if (inlineBox.isChildrenEmpty()) {
                inlineBoxes.remove(inlineBox);
                getView().removeView(inlineBox);
            }
            return;
        }

        // fixed 布局操作
        if (fixedNoneBoxMap.containsKey(child)) {
            FixedNoneBox noneBox = fixedNoneBoxMap.remove(child);
            hummerContext.getContainer().removeView(child);
            getView().removeView(noneBox);
            return;
        }

        getView().removeView(child);

        // 相邻 InlineBox 合并
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK) {
            mergeInlineBox();
        }
    }

    public void removeAll() {
        // inline
        inlineBoxes.clear();
        // fixed
        for (Map.Entry<HMBase, FixedNoneBox> entry : fixedNoneBoxMap.entrySet()) {
            HMBase hmBase = entry.getKey();
            FixedNoneBox noneBox = entry.getValue();
            hummerContext.getContainer().removeView(hmBase);
            getView().removeView(noneBox);
        }
        fixedNoneBoxMap.clear();
        // 解除 HummerExtLayout 绑定关系
        for (HMBase hmBase : children) {
            hmBase.getJSValue().unprotect();
            hmBase.setPositionChangedListener(null);
            hmBase.setDisplayChangedListener(null);
        }
        children.clear();

        getView().removeAllViews();
    }

    public void insertBefore(HMBase child, HMBase existing) {
        if (child == null || existing == null) {
            return;
        }

        child.getJSValue().protect();
        child.setPositionChangedListener(this);
        child.setDisplayChangedListener(this);
        children.add(child);
        HMBase finalChild = child;
        HMBase finalExisting = existing;

        // 支持 position:fixed 布局样式
        if (child.getPosition() == HummerLayoutExtendUtils.Position.FIXED) {
            hummerContext.getContainer().addView(child);
            FixedNoneBox fixedNoneBox = new FixedNoneBox(hummerContext);
            fixedNoneBoxMap.put(child, fixedNoneBox);
            finalChild = fixedNoneBox;
        }
        if (fixedNoneBoxMap.containsKey(existing)) {
            finalExisting = fixedNoneBoxMap.get(existing);
        }

        // 支持 display:inline 布局样式
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK) {
            HummerLayoutExtendUtils.markExtendCssView(child);
            if ((child.getDisplay() == HummerLayoutExtendUtils.Display.INLINE
                    || child.getDisplay() == HummerLayoutExtendUtils.Display.INLINE_BLOCK)) {
                if (existing.getInlineBox() != null) {
                    child.setInlineBox(existing.getInlineBox());
                    existing.getInlineBox().insertBefore(child, existing);
                    finalChild = null;
                } else {
                    InlineBox box = new InlineBox(hummerContext);
                    child.setInlineBox(box);
                    box.add(child);
                    inlineBoxes.add(box);
                    finalChild = box;
                }
            }
        }

        // 支持 display:block 将 display:inline 的 inlineBox拆开的场景
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK
                && (child.getDisplay() != HummerLayoutExtendUtils.Display.INLINE
                && child.getDisplay() != HummerLayoutExtendUtils.Display.INLINE_BLOCK)
                && existing.getInlineBox() != null) {
            InlineBox oldInlineBox = existing.getInlineBox();
            int indexM = oldInlineBox.getChildren().indexOf(existing);
            InlineBox inlineBox1 = new InlineBox(hummerContext);
            InlineBox inlineBox2 = new InlineBox(hummerContext);
            int index = 0;
            while (!oldInlineBox.isChildrenEmpty()) {
                HMBase hmBase = oldInlineBox.getChildren().get(0);
                if (index < indexM) {
                    oldInlineBox.remove(hmBase);
                    inlineBox1.add(hmBase);
                    hmBase.setInlineBox(inlineBox1);
                } else {
                    oldInlineBox.remove(hmBase);
                    inlineBox2.add(hmBase);
                    hmBase.setInlineBox(inlineBox2);
                }
                index++;
            }
            int oldIndex = getYogaNode().indexOf(oldInlineBox.getYogaNode());
            getView().removeView(oldInlineBox);
            getView().addView(inlineBox2, oldIndex);
            getView().addView(inlineBox1, oldIndex);
            inlineBoxes.add(inlineBox1);
            inlineBoxes.add(inlineBox2);
            finalExisting = inlineBox2;
        }

        // 扩展样式处理
        if (HummerLayoutExtendUtils.isExtendCssView(child)) {
            HummerLayoutExtendUtils.applyChildDisplayStyle(getDisplay().value(), child);
        }

        // 默认处理
        if (finalChild != null) {
            getView().insertBefore(finalChild, finalExisting);
        }

        // 相邻 InlineBox 合并
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK) {
            mergeInlineBox();
        }
    }

    public void replaceChild(HMBase child, HMBase old) {
        if (child == null || old == null) {
            return;
        }

        child.getJSValue().protect();
        child.setPositionChangedListener(this);
        child.setDisplayChangedListener(this);
        old.getJSValue().unprotect();
        old.setPositionChangedListener(null);
        old.setDisplayChangedListener(null);

        children.add(child);
        children.remove(old);
        HMBase finalChild = child;
        HMBase finalOld = old;

        // 支持 position:fixed 布局样式
        if (child.getPosition() == HummerLayoutExtendUtils.Position.FIXED) {
            hummerContext.getContainer().addView(child);
            FixedNoneBox fixedNoneBox = new FixedNoneBox(hummerContext);
            fixedNoneBoxMap.put(child, fixedNoneBox);
            finalChild = fixedNoneBox;
        }
        if (fixedNoneBoxMap.containsKey(old)) {
            hummerContext.getContainer().removeView(old);
            finalOld = fixedNoneBoxMap.get(old);
        }

        // 支持 display:inline 布局样式
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK) {
            HummerLayoutExtendUtils.markExtendCssView(child);
            if ((child.getDisplay() == HummerLayoutExtendUtils.Display.INLINE
                    || child.getDisplay() == HummerLayoutExtendUtils.Display.INLINE_BLOCK)) {
                if (old.getInlineBox() != null) {
                    child.setInlineBox(old.getInlineBox());
                    old.getInlineBox().replace(child, old);
                    finalChild = null;
                } else {
                    InlineBox box = new InlineBox(hummerContext);
                    child.setInlineBox(box);
                    box.add(child);
                    inlineBoxes.add(box);
                    finalChild = box;
                }
            }
        }

        // 支持 display:block 将 display:inline 的 inlineBox 拆开的场景
        if ((child.getDisplay() != HummerLayoutExtendUtils.Display.INLINE
                && child.getDisplay() != HummerLayoutExtendUtils.Display.INLINE_BLOCK)
                && old.getInlineBox() != null) {
            InlineBox oldInlineBox = old.getInlineBox();
            int indexM = oldInlineBox.getChildren().indexOf(old);
            InlineBox inlineBox1 = new InlineBox(hummerContext);
            InlineBox inlineBox2 = new InlineBox(hummerContext);
            int index = 0;
            while (!oldInlineBox.isChildrenEmpty()) {
                HMBase hmBase = oldInlineBox.getChildren().get(0);
                if (index < indexM) {
                    oldInlineBox.remove(hmBase);
                    inlineBox1.add(hmBase);
                    hmBase.setInlineBox(inlineBox1);
                } else if (index > indexM) {
                    oldInlineBox.remove(hmBase);
                    inlineBox2.add(hmBase);
                    hmBase.setInlineBox(inlineBox2);
                } else {
                    // index == indexM
                    oldInlineBox.remove(hmBase);
                }
                index++;
            }

            int oldIndex = getYogaNode().indexOf(oldInlineBox.getYogaNode());
            getView().removeView(oldInlineBox);
            getView().addView(inlineBox2, oldIndex);
            getView().addView(old, oldIndex);
            getView().addView(inlineBox1, oldIndex);
            inlineBoxes.add(inlineBox1);
            inlineBoxes.add(inlineBox2);
            finalOld = old;
        }

        // 扩展样式处理
        if (HummerLayoutExtendUtils.isExtendCssView(child)) {
            HummerLayoutExtendUtils.applyChildDisplayStyle(getDisplay().value(), child);
        }

        // 默认处理
        if (finalChild != null) {
            getView().replaceView(finalChild, finalOld);
        }

        // 相邻 InlineBox 合并
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK) {
            mergeInlineBox();
        }
    }

    public HMBase getElementById(String viewID) {

        // 默认处理
        HMBase result = getView().getViewById(viewID);

        // inline box 事件透传
        if (result == null) {
            for (InlineBox inlineBox : inlineBoxes) {
                result = inlineBox.getSubview(viewID);
                if (result != null) {
                    break;
                }
            }
        }

        // fixed 事件透传
        if (result == null) {
            for (Map.Entry<HMBase, FixedNoneBox> entry : fixedNoneBoxMap.entrySet()) {
                HMBase hmBase = entry.getKey();
                if (hmBase.getViewID().equals(viewID)) {
                    result = hmBase;
                    break;
                }
            }
        }

        if (result != null) {
            // JSValue从native返回到js侧时，引用计数会自动减1，这里需要protect一下避免被回收
            result.getJSValue().protect();
        }
        return result;
    }

    @Override
    public void dispatchChildPositionChanged(HMBase child,
                                             HummerLayoutExtendUtils.Position origin,
                                             HummerLayoutExtendUtils.Position replace) {

        // 转换逻辑: position:fixed -> position:relative | position:absolute | position:none
        if (origin == HummerLayoutExtendUtils.Position.FIXED
                && replace == HummerLayoutExtendUtils.Position.YOGA) {
            if (fixedNoneBoxMap.containsKey(child)) {
                FixedNoneBox fixedNoneBox = fixedNoneBoxMap.remove(child);
                hummerContext.getContainer().removeView(child);
                getView().replaceView(child, fixedNoneBox);
            }
        }

        // 转换逻辑: position:relative | position:absolute | position:none -> position:fixed
        if (origin == HummerLayoutExtendUtils.Position.YOGA
                && replace == HummerLayoutExtendUtils.Position.FIXED) {
            FixedNoneBox fixedNoneBox = new FixedNoneBox(hummerContext);
            fixedNoneBoxMap.put(child, fixedNoneBox);
            getView().replaceView(fixedNoneBox, child);
            hummerContext.getContainer().addView(child);
        }

        // 相邻 InlineBox 合并
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK) {
            mergeInlineBox();
        }
    }

    @Override
    public void dispatchChildDisplayChanged(HMBase child,
                                            HummerLayoutExtendUtils.Display origin,
                                            HummerLayoutExtendUtils.Display replace) {

        // 父元素必须要 display:block 才需要做子元素布局调整
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK) {
            if ((origin == HummerLayoutExtendUtils.Display.BLOCK
                    || origin == HummerLayoutExtendUtils.Display.YOGA)
                    && (replace == HummerLayoutExtendUtils.Display.INLINE
                    || replace == HummerLayoutExtendUtils.Display.INLINE_BLOCK)) {
                // 转化逻辑: display:block | display:flex -> display:inline
                InlineBox box = new InlineBox(hummerContext);
                inlineBoxes.add(box);
                getView().replaceView(box, child);
                child.setInlineBox(box);
                box.add(child);
            } else if ((origin == HummerLayoutExtendUtils.Display.INLINE
                    || origin == HummerLayoutExtendUtils.Display.INLINE_BLOCK)
                    && (replace == HummerLayoutExtendUtils.Display.BLOCK
                    || replace == HummerLayoutExtendUtils.Display.YOGA)) {
                // 转化逻辑: display:inline -> display:block | display:flex
                if (child.getInlineBox() != null) {
                    InlineBox inlineBox0 = child.getInlineBox();
                    int indexM = inlineBox0.getChildren().indexOf(child);
                    InlineBox inlineBox1 = new InlineBox(hummerContext);
                    InlineBox inlineBox2 = new InlineBox(hummerContext);
                    int index = 0;
                    while (!inlineBox0.isChildrenEmpty()) {
                        HMBase hmBase = inlineBox0.getChildren().get(0);
                        if (index < indexM) {
                            inlineBox0.remove(hmBase);
                            inlineBox1.add(hmBase);
                            hmBase.setInlineBox(inlineBox1);
                        } else if (index > indexM) {
                            inlineBox0.remove(hmBase);
                            inlineBox2.add(hmBase);
                            hmBase.setInlineBox(inlineBox2);
                        } else {
                            // index == indexM
                            inlineBox0.remove(hmBase);
                        }
                        index++;
                    }
                    int oldIndex = getYogaNode().indexOf(inlineBox0.getYogaNode());
                    getView().removeView(inlineBox0);
                    getView().addView(inlineBox2, oldIndex);
                    getView().addView(child, oldIndex);
                    getView().addView(inlineBox1, oldIndex);
                    inlineBoxes.add(inlineBox1);
                    inlineBoxes.add(inlineBox2);
                }
            }
        }

        // 相邻 InlineBox 合并
        if (getDisplay() == HummerLayoutExtendUtils.Display.BLOCK) {
            mergeInlineBox();
        }
    }

    public List<HMBase> getChildren() {
        return children;
    }

    // 合并相邻的InlineBox
    private void mergeInlineBox() {

        // InlineBox 顺序排序
        Collections.sort(inlineBoxes, new Comparator<InlineBox>() {
            @Override
            public int compare(InlineBox o1, InlineBox o2) {
                int i1 = getYogaNode().indexOf(o1.getYogaNode());
                int i2 = getYogaNode().indexOf(o2.getYogaNode());
                return i1 - i2;
            }
        });

        // 删除无用InlineBox
        Iterator<InlineBox> it = inlineBoxes.iterator();
        while (it.hasNext()) {
            InlineBox box = it.next();
            if (box.isChildrenEmpty()) {
                getView().removeView(box);
                it.remove();
            }
        }

        // 查找相邻InlineBox
        List<List<InlineBox>> mergeInlineBoxes = new ArrayList<>();
        List<InlineBox> curMergeInlineBox = new ArrayList<>();
        mergeInlineBoxes.add(curMergeInlineBox);
        int preIndex = Integer.MAX_VALUE / 2;
        int curIndex;
        it = inlineBoxes.iterator();
        while (it.hasNext()) {
            InlineBox box = it.next();
            curIndex = getYogaNode().indexOf(box.getYogaNode());
            if (curIndex - preIndex == 1) {
                // 表示相邻
                curMergeInlineBox.add(box);
            } else {
                curMergeInlineBox = new ArrayList<>();
                mergeInlineBoxes.add(curMergeInlineBox);
                curMergeInlineBox.add(box);
            }
            preIndex = curIndex;
        }

        // 合并相邻InlineBox
        for (List<InlineBox> list : mergeInlineBoxes) {
            if (list.size() >= 2) {
                InlineBox mergeInlineBox = new InlineBox(hummerContext);
                inlineBoxes.add(mergeInlineBox);
                for (int i = 0; i < list.size(); i++) {
                    InlineBox inlineBox = list.get(i);
                    if (i == 0) {
                        getView().insertBefore(mergeInlineBox, inlineBox);
                    }
                    while (!inlineBox.isChildrenEmpty()) {
                        HMBase child = inlineBox.getChildren().get(0);
                        inlineBox.remove(child);
                        mergeInlineBox.add(child);
                        child.setInlineBox(mergeInlineBox);
                    }
                    inlineBoxes.remove(inlineBox);
                    getView().removeView(inlineBox);
                }
            }
        }
    }
}
