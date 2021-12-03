package com.didi.hummer.render.style;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.view.View;

import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.utility.YogaNodeUtil;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.android.YogaLayout;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * 这个类主要是封装YogaNode，因为YogaLayout中的YogaNode只适用于处理通过xml布局方式添加的yoga样式，不适用于目前Hummer通过setStyle方式添加的样式；
 * 同时这个类也暂时作为视图调试时的视图树存储类；
 *
 * Created by XiaoFeng on 2019-11-27.
 */
public class HummerNode implements Serializable {

    private transient HMBase linkView;

    private transient YogaNode yogaNode;

    @SerializedName("id")
    private String id;

    @SerializedName("objId")
    private long objId;

    @SerializedName("tagName")
    private String name;

    @SerializedName("alias")
    private String alias;

    @SerializedName("content")
    private String content;

    @SerializedName("style")
    private Map<String, Object> style = new HashMap<>();

    @SerializedName("children")
    private List<HummerNode> children = new LinkedList<>();

    public HummerNode(@NonNull HMBase linkView, @Nullable String nodeId) {
        this.linkView = linkView;
        this.id = TextUtils.isEmpty(nodeId) ? createNodeId() : nodeId;
        this.yogaNode = getYogaNode(linkView);

        if (DebugUtil.isDebuggable() && linkView.getJSValue() != null) {
            name = linkView.getJSValue().getString("className");
            objId = linkView.getJSValue().getLong("objID");
        }
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
            node = YogaNodeUtil.createYogaNode();
            node.setData(view);
            node.setMeasureFunction(new YogaLayout.ViewMeasureFunction());
        }
        return node;
    }

    public void setStyle(Map<String, Object> style) {
        this.style.putAll(style);
        HummerStyleUtils.applyStyle(linkView, style);
    }

    public void resetStyle() {
        HummerStyleUtils.resetYogaStyle(linkView);
    }

    public HMBase getLinkView() {
        return linkView;
    }

    public YogaNode getYogaNode() {
        return yogaNode;
    }

    public String getId() {
        return id;
    }

    public long getObjId() {
        return objId;
    }

    public Map<String, Object> getStyle() {
        return style;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getAlias() {
        return alias;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public List<HummerNode> getChildren() {
        return children;
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

    /**
     * 构造JS侧的视图节点树
     *
     * @param depth
     * @return
     */
    public JSValue getJSNodeTree(int depth) {
        if (linkView == null || linkView.getJSValue() == null) {
            return null;
        }

        JSContext jsContext = linkView.getJSValue().getJSContext();
        JSValue jsNode = (JSValue) jsContext.evaluateJavaScript("new Object();");
        jsNode.set("id", objId);
        jsNode.set("tagName", name);
        jsNode.set("alias", alias);
        jsNode.set("content", content);
        jsNode.set("element", linkView.getJSValue());

        if (depth > 0 && !this.children.isEmpty()) {
            JSValue children = (JSValue) jsContext.evaluateJavaScript("new Array();");
            for (HummerNode n : this.children) {
                children.callFunction("push", n.getJSNodeTree(--depth));
            }
            jsNode.set("children", children);
        }
        return jsNode;
    }
}
