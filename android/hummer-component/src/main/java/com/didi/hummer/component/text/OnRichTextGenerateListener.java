package com.didi.hummer.component.text;

/**
 * 富文本解析监听器
 *
 * Created by XiaoFeng on 2020-02-09.
 */
public interface OnRichTextGenerateListener {

    /**
     * 生成文本回调（由于有远程图片，这个回调可能会回调多次，前一次的普通文字，后一次是远程图片下载完后的文字）
     *
     * @param text
     */
    void onGenerated(CharSequence text);
}
