/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class Node<K, V> {
  key: K;
  value: V;
  next: Node<K, V> | null;
  prev: Node<K, V> | null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
// 链表的tail是最近访问,head是最晚访问,对顺序有要求需要访问tail
export class EasyLinkedHashMap<K, V> {
  private map: Map<K, Node<K, V>>; // 存储键值对的哈希映射
  private head: Node<K, V> | null; // 链表头节点
  private tail: Node<K, V> | null; // 链表尾节点

  constructor() {
    this.map = new Map<K, Node<K, V>>();
    this.head = null;
    this.tail = null;
  }

  // 添加键值对到映射中，并在链表尾部添加新节点
  put(key: K, value: V) {
    if (this.map.has(key)) {
      // 如果键已存在，则更新对应的值
      const node = this.map.get(key)!;
      node.value = value;
      this.moveToTail(node);
    } else {
      // 创建新节点并加入链表尾部
      const newNode = new Node(key, value);
      this.map.set(key, newNode);
      if (this.tail) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      } else {
        this.head = newNode;
        this.tail = newNode;
      }
    }
  }

  // 从映射中移除键值对，并从链表中删除对应节点
  remove(key: K) {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      this.map.delete(key);
      this.removeNode(node);
    }
  }

  // 获取键对应的值，并将对应节点移到链表尾部（表示最近访问）
  get(key: K): V | undefined {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      this.moveToTail(node);
      return node.value;
    }
    return undefined;
  }

  // 将节点移动到链表尾部
  private moveToTail(node: Node<K, V>) {
    if (node === this.tail) {
      return; // 节点已在链表尾部，无需移动
    }

    if (node === this.head) {
      this.head = node.next;
    } else {
      node.prev!.next = node.next;
    }

    node.next!.prev = node.prev;
    this.tail!.next = node;
    node.prev = this.tail;
    node.next = null;
    this.tail = node;
  }

  // 从链表中删除节点
  private removeNode(node: Node<K, V>) {
    if (node === this.head) {
      this.head = node.next;
    } else {
      node.prev!.next = node.next;
    }

    if (node === this.tail) {
      this.tail = node.prev;
    } else {
      node.next!.prev = node.prev;
    }
  }

  // 返回映射中的键值对数量
  size(): number {
    return this.map.size;
  }
  // 返回顺序双向链表
  getTail(){
    return this.tail;
  }

  getHead(){
    return this.head;
  }
  clear(){
    this.map.clear()
    this.head = null;
    this.tail=null;
  }
}