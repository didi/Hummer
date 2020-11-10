package com.didi.hummer.render.style;

import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.component.view.HummerLayoutExtendView;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.WeakHashMap;

/**
 * @author: daiyibo
 * @date: 2020/2/27
 * @desc: 自定义布局效果工具类，赋值实现 display:block、inline、inline-block；position:fixed 效果
 */
@SuppressWarnings({"StatementWithEmptyBody", "WeakerAccess", "ArraysAsListWithZeroOrOneArgument"})
public class HummerLayoutExtendUtils {

    public static Map<HMBase, Map<String, Object>> hmBaseCssStyleMap = new WeakHashMap<>();

    /**
     * 标记样式扩展的元素
     */
    public static void markExtendCssView(HMBase hmBase) {
        if (!hmBaseCssStyleMap.containsKey(hmBase)) {
            hmBaseCssStyleMap.put(hmBase, new HashMap<>());
        }
    }

    /**
     * 是否为需要样式扩展的元素
     */
    public static boolean isExtendCssView(HMBase hmBase) {
        return hmBaseCssStyleMap.containsKey(hmBase);
    }

    /**
     * 是否为需要扩展元素的CSS样式
     */
    public static Map<String, Object> getExtendCssViewStyle(HMBase hmBase) {
        return hmBaseCssStyleMap.get(hmBase);
    }

    /**
     * 子元素根据display，补充CSS样式
     */
    public static void applyChildDisplayStyle(String parentDisplay, HMBase hmChild) {
        if (!isExtendCssView(hmChild)) {
            return;
        }

        Map<String, Object> extendViewStyle = getExtendCssViewStyle(hmChild);
        if (Display.BLOCK.value().equals(parentDisplay)) {
            // 样式前置
            if (hmChild.getDisplay() == Display.BLOCK) {
                Map<String, Object> cssStyleMap = new HashMap<>();
                    if (!extendViewStyle.containsKey(HummerStyleUtils.Yoga.WIDTH)
                            && !extendViewStyle.containsKey(HummerStyleUtils.Yoga.MAX_WIDTH)
                            && !extendViewStyle.containsKey(HummerStyleUtils.Yoga.MIN_WIDTH)) {
                        cssStyleMap.put(HummerStyleUtils.Yoga.WIDTH, "100%");
                    }
                HummerStyleUtils.applyStyle(false, hmChild, cssStyleMap);
            }
            // 复原样式
                HummerStyleUtils.applyStyle(false, hmChild, extendViewStyle);
        } else if (Display.YOGA.value().equals(parentDisplay)) {
            // 样式前置
            if (hmChild.getDisplay() == Display.BLOCK) {
                Map<String, Object> cssStyleMap = new HashMap<>();
                cssStyleMap.put(HummerStyleUtils.Yoga.WIDTH, "auto");
                HummerStyleUtils.applyStyle(false, hmChild, cssStyleMap);
            }
            // 复原样式
                HummerStyleUtils.applyStyle(false, hmChild, extendViewStyle);
        }
    }

    /**
     * 父元素设置display时，补充CSS样式
     */
    public static void applyDisplayStyle(HMBase hmBase, String replace) {
        // 当前元素处理
        // 复原样式
        if (isExtendCssView(hmBase)) {
            Map<String, Object> extendViewStyle = getExtendCssViewStyle(hmBase);
            HummerStyleUtils.applyStyle(false, hmBase, extendViewStyle);
        }
        // 样式补充
        Map<String, Object> addCssStyle = new HashMap<>();
        if (Display.BLOCK.value().equals(replace)) {
            addCssStyle.put(HummerStyleUtils.Yoga.FLEX_DIRECTION, "column");
        }
        if (Display.INLINE.value().equals(replace)) {
            addCssStyle.put(HummerStyleUtils.Yoga.WIDTH, "auto");
            addCssStyle.put(HummerStyleUtils.Yoga.MAX_WIDTH, "auto");
            addCssStyle.put(HummerStyleUtils.Yoga.MIN_WIDTH, "auto");
            addCssStyle.put(HummerStyleUtils.Yoga.HEIGHT, "auto");
            addCssStyle.put(HummerStyleUtils.Yoga.MAX_HEIGHT, "auto");
            addCssStyle.put(HummerStyleUtils.Yoga.MIN_HEIGHT, "auto");
            addCssStyle.put(HummerStyleUtils.Yoga.MARGIN_ALL, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.MARGIN_LEFT, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.MARGIN_RIGHT, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.MARGIN_TOP, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.MARGIN_BOTTOM, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.MARGIN_START, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.MARGIN_END, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.MARGIN_HORIZONTAL, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.MARGIN_VERTICAL, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.PADDING_ALL, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.PADDING_BOTTOM, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.PADDING_END, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.PADDING_LEFT, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.PADDING_RIGHT, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.PADDING_START, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.PADDING_TOP, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.PADDING_HORIZONTAL, "0%");
            addCssStyle.put(HummerStyleUtils.Yoga.PADDING_VERTICAL, "0%");
        }
        if (Display.INLINE_BLOCK.value().equals(replace)) {
            addCssStyle.put(HummerStyleUtils.Yoga.FLEX_DIRECTION, "column");
        }
        HummerStyleUtils.applyStyle(false, hmBase, addCssStyle);
        // 子元素
        // 子元素根据display，补充CSS样式
        if (hmBase instanceof HummerLayoutExtendView) {
            List<HMBase> children = ((HummerLayoutExtendView) hmBase).getChildren();
            for (HMBase child : children) {
                applyChildDisplayStyle(replace, child);
            }
        }
    }

    /**
     * 根据display，拦截样式
     */
    public static boolean interceptDisplayStyle(HMBase hmBase, String key, Object value) {
        // 缓存css样式
        if (!HummerStyleUtils.Hummer.DISPLAY.equals(key)) {
            if (isExtendCssView(hmBase)) {
                Map<String, Object> extendViewStyle = getExtendCssViewStyle(hmBase);
                extendViewStyle.put(key, value);
            }
        }
        // 拦截样式
        if (hmBase.getDisplay() == Display.INLINE) {
            return INLINE_INTERCEPT_STYLES.contains(key);
        }
        if (hmBase.getDisplay() == Display.BLOCK) {
            return BLOCK_INTERCEPT_STYLES.contains(key);
        }
        if (hmBase.getDisplay() == Display.INLINE_BLOCK) {
            return INLINE_BLOCK_INTERCEPT_STYLES.contains(key);
        }
        return false;
    }

    // display:block 拦截列表
    private final static List<String> BLOCK_INTERCEPT_STYLES = Arrays.asList(
            HummerStyleUtils.Yoga.FLEX_DIRECTION,
            HummerStyleUtils.Yoga.FLEX_BASIS,
            HummerStyleUtils.Yoga.FLEX_DIRECTION,
            HummerStyleUtils.Yoga.FLEX_GROW,
            HummerStyleUtils.Yoga.FLEX_SHRINK,
            HummerStyleUtils.Yoga.FLEX_WRAP
    );

    // display:inline-block 拦截列表
    private final static List<String> INLINE_BLOCK_INTERCEPT_STYLES = Arrays.asList(
            HummerStyleUtils.Yoga.FLEX_DIRECTION,
            HummerStyleUtils.Yoga.FLEX_BASIS,
            HummerStyleUtils.Yoga.FLEX_DIRECTION,
            HummerStyleUtils.Yoga.FLEX_GROW,
            HummerStyleUtils.Yoga.FLEX_SHRINK,
            HummerStyleUtils.Yoga.FLEX_WRAP
    );

    // display:inline 拦截列表
    private final static List<String> INLINE_INTERCEPT_STYLES = Arrays.asList(
            HummerStyleUtils.Yoga.BORDER,
            HummerStyleUtils.Yoga.BORDER_ALL,
            HummerStyleUtils.Yoga.BORDER_LEFT,
            HummerStyleUtils.Yoga.BORDER_RIGHT,
            HummerStyleUtils.Yoga.BORDER_TOP,
            HummerStyleUtils.Yoga.BORDER_BOTTOM,
            HummerStyleUtils.Yoga.BORDER_START,
            HummerStyleUtils.Yoga.BORDER_END,
            HummerStyleUtils.Yoga.BORDER_HORIZONTAL,
            HummerStyleUtils.Yoga.BORDER_VERTICAL,
            HummerStyleUtils.Yoga.FLEX_BASIS,
            HummerStyleUtils.Yoga.FLEX_DIRECTION,
            HummerStyleUtils.Yoga.FLEX_GROW,
            HummerStyleUtils.Yoga.FLEX_SHRINK,
            HummerStyleUtils.Yoga.FLEX_WRAP,
            HummerStyleUtils.Yoga.WIDTH,
            HummerStyleUtils.Yoga.HEIGHT,
            HummerStyleUtils.Yoga.MAX_WIDTH,
            HummerStyleUtils.Yoga.MAX_HEIGHT,
            HummerStyleUtils.Yoga.MIN_WIDTH,
            HummerStyleUtils.Yoga.MIN_HEIGHT,
            HummerStyleUtils.Yoga.MARGIN,
            HummerStyleUtils.Yoga.MARGIN_ALL,
            HummerStyleUtils.Yoga.MARGIN_LEFT,
            HummerStyleUtils.Yoga.MARGIN_RIGHT,
            HummerStyleUtils.Yoga.MARGIN_TOP,
            HummerStyleUtils.Yoga.MARGIN_BOTTOM,
            HummerStyleUtils.Yoga.MARGIN_START,
            HummerStyleUtils.Yoga.MARGIN_END,
            HummerStyleUtils.Yoga.MARGIN_HORIZONTAL,
            HummerStyleUtils.Yoga.MARGIN_VERTICAL,
            HummerStyleUtils.Yoga.PADDING,
            HummerStyleUtils.Yoga.PADDING_ALL,
            HummerStyleUtils.Yoga.PADDING_BOTTOM,
            HummerStyleUtils.Yoga.PADDING_END,
            HummerStyleUtils.Yoga.PADDING_LEFT,
            HummerStyleUtils.Yoga.PADDING_RIGHT,
            HummerStyleUtils.Yoga.PADDING_START,
            HummerStyleUtils.Yoga.PADDING_TOP,
            HummerStyleUtils.Yoga.PADDING_HORIZONTAL,
            HummerStyleUtils.Yoga.PADDING_VERTICAL
    );

    // Hummer Position 扩展布局
    public enum Position {

        // YOGA处理
        YOGA("flex"),
        // position:fixed 自行处理
        FIXED("fixed");

        private String value;

        Position(String v) {
            value = v;
        }

        public String value() {
            return value;
        }
    }

    // Hummer Display 扩展布局
    public enum Display {

        // YOGA处理
        YOGA("flex"),
        // display:block 自行处理
        BLOCK("block"),
        // display:inline 自行处理
        INLINE("inline"),
        // display:inline-block 自行处理
        INLINE_BLOCK("inline-block");

        private String value;

        Display(String v) {
            value = v;
        }

        public String value() {
            return value;
        }
    }
}
