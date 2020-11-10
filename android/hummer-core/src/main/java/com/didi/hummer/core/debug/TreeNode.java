package com.didi.hummer.core.debug;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 组件树和函数调用树的节点
 *
 * Created by XiaoFeng on 2020/3/15.
 */
public class TreeNode {

    /**
     * 节点id
     */
    public long id;

    /**
     * 节点名字
     */
    public String name;

    /**
     * 简要提示
     */
    public String tag;

    /**
     * 子节点列表
     */
    public List<TreeNode> children = new ArrayList<>();

    /**
     * 真实父亲（通过appendChild来判断）
     */
    public TreeNode parent;

    /**
     * 虚拟父亲（通过begin和end来判断）
     */
    public TreeNode virtualParent;

    /**
     * 是否闭合（begin和end是否已成对出现）
     */
    public boolean isClosed;

    /**
     * 时间戳
     */
    public long timestamp;

    public TreeNode(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public void add(TreeNode node) {
        children.add(node);
    }

    public void remove(TreeNode node) {
        Iterator<TreeNode> it = children.iterator();
        while(it.hasNext()) {
            TreeNode n = it.next();
            if (n.id == node.id) {
                it.remove();
                break;
            }
        }
    }

    public boolean contains(TreeNode node) {
        Iterator<TreeNode> it = children.iterator();
        while(it.hasNext()) {
            TreeNode n = it.next();
            if (n.id == node.id) {
                return true;
            }
        }
        return false;
    }
}
