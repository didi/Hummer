## 拉取请求（Pull Request）中的变更日志（ChangeLog）
变更日志条目用于在拉取请求中提供一系列太长不读（tl;dr:）的内容：会影响 Android 吗？是否存在破坏性变更（Breaking Change）？有什么新内容被添加了吗？

使用标准格式提供变更日志有助于编写发行说明。请在请求描述中包含一个变更日志。如果拉取请求被合并，则拉取请求描述将用作提交消息。 

### 格式
一条变更日志条目有如下格式
```
## Changelog:

[Category] [Type] - Message
```

这个 "Category" 域可能是下列之一：
* Android，这些改变会影响 Android
* iOS，这些变更会影响 iOS
* General，这些变更不适合使用其他分类类型
* Internal，这些变更对阅读发行注记（Release Note）的开发人员无关

这个 "Type" 域可能是下列之一：
* Added，新添加的特性
* Changed，改变了现有功能的特性
* Deprecated，未来会被移除的特性
* Removed，现在被移除的功能
* Fixed，问题修复
* Security，安全问题

最后，"Message" 字段在功能级别回答“什么和为什么”。用这个简单地告诉用户应当注意的的变化。

更多信息，请参阅 [How do I make a good changelog?](https://keepachangelog.com/en/1.0.0/#how) 和 [Why keep a changelog?](https://keepachangelog.com/en/1.0.0/#why)

### 样例
* `[General] [Added] - Add snapToOffsets prop to ScrollView component`
* `[General] [Fixed] - Fix various issues in snapToInterval on ScrollView component`
* `[iOS] [Fixed] - Fix crash in HMImageView`

### FAQ
* **如果我的拉取请求同时包含对 Android 和 JavaScript 的更改怎么办？** 使用 Android 类别。
* **如果我的拉取请求同时包含对 Android 和 iOS 的更改怎么办？** 如果更改是在单个拉取请求中进行的，请使用 General 类别。
* **如果我的拉取请求同时包含对 Android、iOS 和 JavaScript 的更改怎么办？** 如果更改是在单个拉取请求中进行的，请使用 General 类别。
* **如果……怎么办？？** 任何变更日志条目都比没有好。如果您不确定是否挑选了正确的分类，请使用 "Message" 字段简洁描述您的更改