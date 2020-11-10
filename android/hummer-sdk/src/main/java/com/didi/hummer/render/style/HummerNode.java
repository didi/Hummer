package com.didi.hummer.render.style;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.view.View;

import com.didi.hummer.render.component.view.HMBase;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.android.YogaLayout;

import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * 这个类主要是封装YogaNode，因为YogaLayout中的YogaNode只适用于处理通过xml布局方式添加的yoga样式，不适用于目前Hummer通过setStyle方式添加的样式
 *
 * Created by XiaoFeng on 2019-11-27.
 */
public class HummerNode {

    private HMBase linkView;
    private String nodeId;
    private YogaNode yogaNode;
    private List<HummerNode> children = new LinkedList<>();
    private Map<String, Object> style = new HashMap<>();

    public HummerNode(@NonNull HMBase linkView, @Nullable String nodeId) {
        this.linkView = linkView;
        this.nodeId = TextUtils.isEmpty(nodeId) ? createNodeId() : nodeId;
        this.yogaNode = getYogaNode(linkView);
    }

    private String createNodeId() {
        return "hm_node_" + System.currentTimeMillis();
    }

    private YogaNode getYogaNode(HMBase linkView) {
        View view = linkView.getView();
        YogaNode node;
        if (view instanceof YogaLayout) {
            node = ((YogaLayout) view).getYogaNode();
        } else {
            node = createYogaNode();
            node.setData(view);
            node.setMeasureFunction(new YogaLayout.ViewMeasureFunction());
        }
        return node;
    }

    /**
     * 为了兼容Hummer和RN共存的情况下，RN中Yoga版本过低的问题（新老版本创建YogaNode的方式不同）
     *
     * @return
     */
    private YogaNode createYogaNode() {
        YogaNode node = null;
        if ((YogaNode.class.getModifiers() & Modifier.ABSTRACT) != 0) {
            // 新版（YogaNode是abstract类）
            node = YogaNode.create();
        } else {
            // 旧版（YogaNode是普通类）
            try {
                Constructor<?> constructor = YogaNode.class.getDeclaredConstructor();
                node = (YogaNode) constructor.newInstance();
            } catch (Exception e2) {}
        }
        return node;
    }

    public String getNodeId() {
        return nodeId;
    }

    public YogaNode getYogaNode() {
        return yogaNode;
    }

    public void setStyle(Map<String, Object> style) {
        this.style.putAll(style);
        HummerStyleUtils.applyStyle(linkView, style);
    }

    public Map<String, Object> getStyle() {
        return style;
    }

    public void resetStyle() {
        HummerStyleUtils.resetYogaStyle(linkView);
    }

    public void appendChild(HummerNode node) {
        children.add(node);
    }

    public void removeChild(HummerNode node) {
        children.remove(node);
    }

    public void removeAll() {
        children.clear();
    }

    public void insertBefore(HummerNode newNode, HummerNode oldNode) {
        int index = children.lastIndexOf(oldNode);
        if (index > 0) {
            children.add(index, newNode);
        }
    }

    public void replaceChild(HummerNode newNode, HummerNode oldNode) {
        int index = children.lastIndexOf(oldNode);
        if (index > 0) {
            children.remove(oldNode);
            children.add(index, newNode);
        }
    }

}
