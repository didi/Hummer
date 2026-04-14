# Tenon Vue 阶段性分析上下文

## 1. 基线与当前状态

- 基线提交: `51aba5b4b4cdbd4141eddc7db94288079cf58a30`
- 当前分支: `fix/tenon-vue-1.8.6-bugfix`
- 当前 HEAD: `470e770d549d4c8bd77dc54a98d7cc65a5492065`
- 相对基线前进提交数: `7`

## 2. 这 7 个提交的演进

按时间顺序:

1. `e6bbed157217428769b5b5345a3683078ee6d86b`
   - `fix: 修复tenon-vue内存泄露问题`
   - 主要涉及: `Base` 生命周期、若干组件、style 工具与构建配置。
2. `d1bf57c0d55a2f45a4a392ae027893ea0d86a361`
   - `chore: 1.8.6-patch.2`
   - 版本号变更。
3. `24427372b4af113be5d7ee7ea845e48c2ac0032b`
   - `fix: 节点操作`
   - 主要涉及: `nodeOps`。
4. `eab9ae05e03149053374ccc09b10aff996618468`
   - `chore: 1.8.6-patch.3`
   - 版本号变更。
5. `c379b3ee2a10be36ca576d47c73bc423b71300d3`
   - `fix: 尝试修复fixed节点没有被正确移除的问题`
   - 主要涉及: `nodeOps` + `Base`。
6. `d5817daf833cd7de88f1872e7a1a275262d8f324`
   - `fix: 修复fixed节点移除问题`
   - 主要涉及: `nodeOps` + `Base`。
7. `470e770d549d4c8bd77dc54a98d7cc65a5492065`
   - `chore: @hummer/tenon-vue 1.8.6-patch.4`
   - 版本号变更。

## 2.1 提交级细粒度结论（改动点/原因/验证）

### `e6bbed157217428769b5b5345a3683078ee6d86b`

- 触达文件:
   - `tenon/packages/tenon-vue/src/runtime/nodes/Base.ts`
   - `tenon/packages/tenon-vue/src/runtime/nodes/components/input.ts`
   - `tenon/packages/tenon-vue/src/runtime/nodes/components/scroller.ts`
   - `tenon/packages/tenon-vue/src/runtime/nodes/components/switch.ts`
   - `tenon/packages/tenon-vue/src/runtime/nodes/components/textarea.ts`
   - `tenon/packages/tenon-vue/src/utils/style.ts`
   - `tenon/rollup.config.js`
- 代码层关键变更（可确认）:
   - `Base` 新增 `_eventHandlerMap` 与 `clearAllEventListeners()`，并在销毁流程调用，目的是确保监听器可被按引用解绑。
   - `Base._onDestoryed()` 引入 `_destroyed` 防重入，同时递归清理子节点链路引用（`parent/prevSibling/nextSibling`），降低悬挂引用风险。
   - `Base.unlinkSiblings()` 在解绑时补齐 `oldParent.children.delete(this)` 与 `this.parent = undefined`，修复树关系一致性。
   - `setStyle` 的 merge 顺序调整，去掉对旧 `this._style` 的直接混入，降低历史样式残留。
   - `style.ts` 增加 CSSOM 全局缓存累积风险的 TODO 标注，明确下一步治理方向（覆盖/去重/按生命周期清理）。
- 变更动机（推断）:
   - 以“监听器解绑 + 节点引用断开 + 样式缓存治理”为主线，处理长期运行下的内存增长。
- 验证状态:
   - 已确认（静态）: 释放路径比基线更完整，存在显式解绑与引用清空。
   - 待确认（动态）: 反复 mount/unmount 后 native listener 数量、CSSOM rule 数是否不再单调增长。

### `d1bf57c0d55a2f45a4a392ae027893ea0d86a361`

- 触达文件: `tenon/packages/tenon-vue/package.json`
- 代码层关键变更: 版本升级到 `1.8.6-patch.2`。
- 变更动机（推断）: 发布上一个 fix 批次。
- 验证状态: 已确认。

### `24427372b4af113be5d7ee7ea845e48c2ac0032b`

- 触达文件: `tenon/packages/tenon-vue/src/runtime/nodeOps.ts`
- 代码层关键变更（可确认）:
   - `remove(child)` 在 `child.parent` 存在时走 `parent._removeChild(child)` 并立刻返回。
   - 新增 fallback：当节点已脱离 `Base` 树时，仅清理链路引用，不再触发销毁逻辑，避免重入卸载。
- 变更动机（推断）:
   - 处理“节点已半脱离状态”下的 remove 行为，减少重复销毁/异常链路。
- 验证状态:
   - 已确认（静态）: 路径分叉清晰，fallback 不再触发 `_onDestoryed`。
   - 待确认（动态）: 极端时序下（先 detach 再 remove）是否完全无副作用。

### `eab9ae05e03149053374ccc09b10aff996618468`

- 触达文件: `tenon/packages/tenon-vue/package.json`
- 代码层关键变更: 版本升级到 `1.8.6-patch.3`。
- 变更动机（推断）: 发布节点操作修复批次。
- 验证状态: 已确认。

### `c379b3ee2a10be36ca576d47c73bc423b71300d3`

- 触达文件:
   - `tenon/packages/tenon-vue/src/runtime/nodeOps.ts`
   - `tenon/packages/tenon-vue/src/runtime/nodes/Base.ts`
- 代码层关键变更（基于提交主题）:
   - `nodeOps.remove` 在 parent 不存在时，fallback 分支尝试主动调用 `child._onDestoryed()`。
   - `Base._onDestoryed` 将 `removeChildWithFixed(this)` 调整到前置执行（在清空 children 前）。
- 变更动机（推断）:
   - 修补 `fixed` 节点未被正确移除的问题。
- 验证状态:
   - 已确认（静态）: 该提交确实引入了 fallback 主动销毁路径。
   - 待确认（动态）: fallback 主动销毁可能带来重入卸载副作用，结论被后续提交继续修正。

### `d5817daf833cd7de88f1872e7a1a275262d8f324`

- 触达文件:
   - `tenon/packages/tenon-vue/src/runtime/nodeOps.ts`
   - `tenon/packages/tenon-vue/src/runtime/nodes/Base.ts`
- 代码层关键变更（基于提交主题）:
   - 回退 `nodeOps.remove` fallback 中对 `_onDestoryed` 的主动调用，仅做链路引用清理。
   - 在 `Base` 增加 `_destroyed` 防重入保护，避免重复触发销毁生命周期。
- 变更动机（推断）:
   - 收敛前一版的重入风险，并稳定 `fixed` 节点移除流程。
- 验证状态:
   - 已确认（静态）: fallback 与销毁职责边界更清晰，且新增防重入。
   - 待确认（动态）: 仍建议在嵌套 fixed + 快速切页场景压测。

### `470e770d549d4c8bd77dc54a98d7cc65a5492065`

- 触达文件: `tenon/packages/tenon-vue/package.json`
- 代码层关键变更: 版本升级到 `1.8.6-patch.4`。
- 变更动机（推断）: 汇总并发布本轮修复。
- 验证状态: 已确认。

## 2.2 当前验证清单（建议直接执行）

1. 重复挂载/卸载页面 100 次，观测监听器数量是否回落。
2. `fixed` 节点在父容器删除、路由切换、条件渲染切换下是否都能移除。
3. 采样 `__GLOBAL__.CSSOM` 各 Map 的 rule 数量，确认不会单调增长。
4. 在 iOS/Android 各执行一次快速切页压测，确认无重复销毁异常。

## 2.3 可复用经验（给人和 AI 共用）

这部分不是“本次事实”，而是可迁移的方法论。后续新开分析窗口时，优先先读这里。

### A. 内存问题排查优先级

1. 先看“事件监听是否可解绑”：是否保存了 original -> wrapped 映射。
2. 再看“节点引用是否断开”：`parent/prevSibling/nextSibling/children` 是否在销毁后清空。
3. 再看“全局缓存是否可回收”：是否只有 append，没有覆盖/去重/清理入口。

### B. 销毁链路设计原则

1. 销毁逻辑必须幂等（可重复调用但副作用不重复），例如 `_destroyed` 防重入。
2. `remove` 与 `destroy` 职责分离：
   - `remove`: 负责树关系拆除。
   - `destroy`: 负责资源回收（监听器、缓存、子树）。
3. 对“已脱离父链”的 fallback 路径，优先做最小清理，避免触发二次销毁。

### C. fixed 节点问题的经验

1. fixed 相关清理应在父链仍完整时执行（避免拿不到上下文）。
2. 对 fixed 场景的修复，必须覆盖三类用例：
   - 父节点直接删除。
   - 条件渲染切换（v-if 式频繁挂载/卸载）。
   - 路由切换或页面快速进出。

### D. CSSOM/样式缓存经验

1. 任何全局样式缓存都要有“增长边界”。
2. 同 selector 重复收集时，默认应覆盖或去重，而不是无上限追加。
3. 必须提供生命周期清理点（页面卸载、应用重渲染边界）。

### E. 提交与文档协同约定

1. 每个 fix 提交都要在文档补“为什么这样改”，避免只有 commit title。
2. 每轮结论必须标注：
   - 已确认（静态代码可证明）
   - 待确认（必须运行验证）
3. 如果后续提交推翻前序假设，要明确写“被哪个提交修正”。

## 2.4 工作区增量变更说明（未提交）

文件: `tenon/packages/tenon-vue/src/runtime/nodes/Base.ts`

### 变更点 1

- 在 `_onDestoryed()` 末尾新增 `this.element = null`。
- 目的: 在销毁完成后主动断开对原生元素的引用，进一步降低悬挂引用风险，帮助 GC 回收。

### 变更点 2

- `_removeChild(child)` 调整执行顺序为:
   1. 若父/子元素存在，先执行 `this.element.removeChild(child.element)`。
   2. 再执行 `child._onDestoryed()` 与链路解绑。
- 目的: 避免“先销毁导致 child.element 被置空”后无法执行原生 remove 的问题。

### 风险评估

- 风险级别: 低。
- 关注点: 若有子类在 `onDestoryed()` 之后仍异步访问 `this.element`，将得到空值，需要确认调用方是否依赖该行为。

### 建议回归

1. 重复挂载/卸载 50~100 次，确认无原生 remove 异常。
2. fixed 节点场景下执行切页与条件渲染切换，确认节点移除与内存曲线正常。

## 3. 基线以来改动范围（汇总）

- 改动文件数: `9`
- 代码变更统计: `133 insertions`, `10 deletions`

文件清单:

- `tenon/packages/tenon-vue/package.json`
- `tenon/packages/tenon-vue/src/runtime/nodeOps.ts`
- `tenon/packages/tenon-vue/src/runtime/nodes/Base.ts`
- `tenon/packages/tenon-vue/src/runtime/nodes/components/input.ts`
- `tenon/packages/tenon-vue/src/runtime/nodes/components/scroller.ts`
- `tenon/packages/tenon-vue/src/runtime/nodes/components/switch.ts`
- `tenon/packages/tenon-vue/src/runtime/nodes/components/textarea.ts`
- `tenon/packages/tenon-vue/src/utils/style.ts`
- `tenon/rollup.config.js`

## 4. 当前可确认的阶段性结论

- 主线问题集中在两类:
  - 内存泄露修复（与节点生命周期、监听/解绑链路相关）。
  - `fixed` 节点移除正确性（多次迭代修复）。
- 发布节奏体现为 patch 连续推进:
  - `1.8.6-patch.2` -> `1.8.6-patch.3` -> `1.8.6-patch.4`。
- 当前包版本已更新为 `1.8.6-patch.4`。

## 5. 建议作为“新开分析窗口”的最小上下文

每次排查结束后，建议按下面 5 项更新此文档:

1. 本次基线（从哪个 commit 开始看）
2. 新增/回退了哪些提交（commit 列表）
3. 关键改动文件与动机（为何改）
4. 已验证结论与未验证假设
5. 下一步实验计划（最小可执行）

## 6. 可直接续写的记录模板

```md
## [YYYY-MM-DD HH:mm] 分析批次 N

- 基线: <commit>
- 对比范围: <base>..HEAD
- 提交增量: <N>

### 本批次目标
-

### 已确认事实
-

### 仍待验证
-

### 关键改动与原因
- <file>: <why>

### 回归风险
-

### 下一步
-
```
