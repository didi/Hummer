package com.didi.hummer.render.style;

import android.content.Context;
import android.graphics.Color;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.jsc.jni.HummerException;
import com.didi.hummer.core.util.ExceptionUtil;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.utility.DPUtil;
import com.didi.hummer.render.utility.RTLUtil;
import com.didi.hummer.render.utility.RemUtil;
import com.didi.hummer.render.utility.YogaAttrUtils;
import com.facebook.yoga.YogaAlign;
import com.facebook.yoga.YogaDirection;
import com.facebook.yoga.YogaDisplay;
import com.facebook.yoga.YogaEdge;
import com.facebook.yoga.YogaFlexDirection;
import com.facebook.yoga.YogaJustify;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.YogaPositionType;
import com.facebook.yoga.YogaWrap;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Created by XiaoFeng on 2019-12-05.
 */
public class HummerStyleUtils {

    class Yoga {
        static final String JUSTIFY_CONTENT = "justifyContent";
        static final String ALIGN_CONTENT = "alignContent";
        static final String ALIGN_ITEMS = "alignItems";
        static final String ALIGN_SELF = "alignSelf";
        static final String ASPECT_RATIO = "aspectRatio";
        static final String BORDER = "border";
        static final String BORDER_ALL = "borderAll";
        static final String BORDER_LEFT = "borderLeft";
        static final String BORDER_RIGHT = "borderRight";
        static final String BORDER_TOP = "borderTop";
        static final String BORDER_BOTTOM = "borderBottom";
        static final String BORDER_START = "borderStart";
        static final String BORDER_END = "borderEnd";
        static final String BORDER_HORIZONTAL = "borderHorizontal";
        static final String BORDER_VERTICAL = "borderVertical";
        static final String DIRECTION = "direction";
        static final String DISPLAY = "display";
        static final String FLEX = "flex";
        static final String FLEX_BASIS = "flexBasis";
        static final String FLEX_DIRECTION = "flexDirection";
        static final String FLEX_GROW = "flexGrow";
        static final String FLEX_SHRINK = "flexShrink";
        static final String FLEX_WRAP = "flexWrap";
        static final String WIDTH = "width";
        static final String HEIGHT = "height";
        static final String MAX_WIDTH = "maxWidth";
        static final String MAX_HEIGHT = "maxHeight";
        static final String MIN_WIDTH = "minWidth";
        static final String MIN_HEIGHT = "minHeight";
        static final String MARGIN = "margin";
        static final String MARGIN_ALL = "marginAll";
        static final String MARGIN_LEFT = "marginLeft";
        static final String MARGIN_RIGHT = "marginRight";
        static final String MARGIN_TOP = "marginTop";
        static final String MARGIN_BOTTOM = "marginBottom";
        static final String MARGIN_START = "marginStart";
        static final String MARGIN_END = "marginEnd";
        static final String MARGIN_HORIZONTAL = "marginHorizontal";
        static final String MARGIN_VERTICAL = "marginVertical";
        static final String PADDING = "padding";
        static final String PADDING_ALL = "paddingAll";
        static final String PADDING_BOTTOM = "paddingBottom";
        static final String PADDING_END = "paddingEnd";
        static final String PADDING_LEFT = "paddingLeft";
        static final String PADDING_RIGHT = "paddingRight";
        static final String PADDING_START = "paddingStart";
        static final String PADDING_TOP = "paddingTop";
        static final String PADDING_HORIZONTAL = "paddingHorizontal";
        static final String PADDING_VERTICAL = "paddingVertical";
        static final String POSITION = "position";
        static final String POSITION_TYPE = "positionType";
        static final String POSITION_ALL = "positionAll";
        static final String POSITION_LEFT = "positionLeft";
        static final String POSITION_RIGHT = "positionRight";
        static final String POSITION_TOP = "positionTop";
        static final String POSITION_BOTTOM = "positionBottom";
        static final String POSITION_START = "positionStart";
        static final String POSITION_END = "positionEnd";
        static final String POSITION_HORIZONTAL = "positionHorizontal";
        static final String POSITION_VERTICAL = "positionVertical";
        static final String LEFT = "left";
        static final String RIGHT = "right";
        static final String TOP = "top";
        static final String BOTTOM = "bottom";
        static final String START = "start";
        static final String END = "end";
    }

    public class Hummer {
        // HMBase
        public static final String BACKGROUND_COLOR = "backgroundColor";
        public static final String BACKGROUND_IMAGE = "backgroundImage";
        public static final String BORDER_STYLE = "borderStyle";
        public static final String BORDER_STYLE_L = "borderLeftStyle";
        public static final String BORDER_STYLE_T = "borderTopStyle";
        public static final String BORDER_STYLE_R = "borderRightStyle";
        public static final String BORDER_STYLE_B = "borderBottomStyle";
        public static final String BORDER_WIDTH = "borderWidth";
        public static final String BORDER_WIDTH_L = "borderLeftWidth";
        public static final String BORDER_WIDTH_T = "borderTopWidth";
        public static final String BORDER_WIDTH_R = "borderRightWidth";
        public static final String BORDER_WIDTH_B = "borderBottomWidth";
        public static final String BORDER_COLOR = "borderColor";
        public static final String BORDER_COLOR_L = "borderLeftColor";
        public static final String BORDER_COLOR_T = "borderTopColor";
        public static final String BORDER_COLOR_R = "borderRightColor";
        public static final String BORDER_COLOR_B = "borderBottomColor";
        public static final String BORDER_RADIUS = "borderRadius";
        public static final String BORDER_RADIUS_TL = "borderTopLeftRadius";
        public static final String BORDER_RADIUS_TR = "borderTopRightRadius";
        public static final String BORDER_RADIUS_BR = "borderBottomRightRadius";
        public static final String BORDER_RADIUS_BL = "borderBottomLeftRadius";
        public static final String BOX_SIZING = "boxSizing";
        public static final String SHADOW = "shadow";
        public static final String OPACITY = "opacity";
        public static final String VISIBILITY = "visibility";
        public static final String Z_INDEX = "zIndex";
        public static final String POSITION = "position";
        public static final String POSITION_TYPE = "positionType";
        public static final String DISPLAY = "display";

        // View
        public static final String OVERFLOW = "overflow";

        // Text/Button
        public static final String COLOR = "color";
        public static final String FONT_SIZE = "fontSize";
        public static final String FONT_FAMILY = "fontFamily";
        public static final String FONT_WEIGHT = "fontWeight";
        public static final String FONT_STYLE = "fontStyle";
        public static final String TEXT_ALIGN = "textAlign";
        public static final String TEXT_VERTICAL_ALIGN = "textVerticalAlign";
        public static final String TEXT_DECORATION = "textDecoration";
        public static final String TEXT_OVERFLOW = "textOverflow";
        public static final String TEXT_LINE_CLAMP = "textLineClamp";
        public static final String LETTER_SPACING = "letterSpacing";
        public static final String LINE_SPACING_MULTI = "lineSpacingMulti";

        // Input/TextArea
        public static final String TYPE = "type";
        public static final String PLACEHOLDER_COLOR = "placeholderColor";
        public static final String PLACEHOLDER_FONT_SIZE = "placeholderFontSize";
        public static final String CURSOR_COLOR = "cursorColor";
        public static final String MAX_LENGTH = "maxLength";
        public static final String RETURN_KEY_TYPE = "returnKeyType";

        // Image
        public static final String RESIZE = "resize";

        // Switch
        public static final String ON_COLOR = "onColor";
        public static final String OFF_COLOR = "offColor";
        public static final String THUMB_COLOR = "thumbColor";

        // List
        public static final String MODE = "mode";
        public static final String SCROLL_DIRECTION = "scrollDirection";
        public static final String COLUMN = "column";
        public static final String LINE_SPACING = "lineSpacing";
        public static final String ITEM_SPACING = "itemSpacing";
        public static final String LEFT_SPACING = "leftSpacing";
        public static final String RIGHT_SPACING = "rightSpacing";
        public static final String TOP_SPACING = "topSpacing";
        public static final String BOTTOM_SPACING = "bottomSpacing";

        // Transform｜Transition
        public static final String TRANSFORM = "transform";
        public static final String TRANSITION = "transition";
        public static final String TRANSITION_DELAY = "transitionDelay";
        public static final String TRANSITION_DURATION = "transitionDuration";
        public static final String TRANSITION_PROPERTY = "transitionProperty";
        public static final String TRANSITION_TIMING_FUNCTION = "transitionTimingFunction";
    }

    private final static List<String> YOGA_STYLES = Arrays.asList(
            Yoga.JUSTIFY_CONTENT,
            Yoga.ALIGN_CONTENT,
            Yoga.ALIGN_ITEMS,
            Yoga.ALIGN_SELF,
            Yoga.ASPECT_RATIO,
            Yoga.BORDER,
            Yoga.BORDER_ALL,
            Yoga.BORDER_LEFT,
            Yoga.BORDER_RIGHT,
            Yoga.BORDER_TOP,
            Yoga.BORDER_BOTTOM,
            Yoga.BORDER_START,
            Yoga.BORDER_END,
            Yoga.BORDER_HORIZONTAL,
            Yoga.BORDER_VERTICAL,
            Yoga.DIRECTION,
            Yoga.DISPLAY,
            Yoga.FLEX,
            Yoga.FLEX_BASIS,
            Yoga.FLEX_DIRECTION,
            Yoga.FLEX_GROW,
            Yoga.FLEX_SHRINK,
            Yoga.FLEX_WRAP,
            Yoga.WIDTH,
            Yoga.HEIGHT,
            Yoga.MAX_WIDTH,
            Yoga.MAX_HEIGHT,
            Yoga.MIN_WIDTH,
            Yoga.MIN_HEIGHT,
            Yoga.MARGIN,
            Yoga.MARGIN_ALL,
            Yoga.MARGIN_LEFT,
            Yoga.MARGIN_RIGHT,
            Yoga.MARGIN_TOP,
            Yoga.MARGIN_BOTTOM,
            Yoga.MARGIN_START,
            Yoga.MARGIN_END,
            Yoga.MARGIN_HORIZONTAL,
            Yoga.MARGIN_VERTICAL,
            Yoga.PADDING,
            Yoga.PADDING_ALL,
            Yoga.PADDING_LEFT,
            Yoga.PADDING_RIGHT,
            Yoga.PADDING_TOP,
            Yoga.PADDING_BOTTOM,
            Yoga.PADDING_START,
            Yoga.PADDING_END,
            Yoga.PADDING_HORIZONTAL,
            Yoga.PADDING_VERTICAL,
            Yoga.POSITION,
            Yoga.POSITION_TYPE,
            Yoga.POSITION_ALL,
            Yoga.POSITION_LEFT,
            Yoga.POSITION_RIGHT,
            Yoga.POSITION_TOP,
            Yoga.POSITION_BOTTOM,
            Yoga.POSITION_START,
            Yoga.POSITION_END,
            Yoga.POSITION_HORIZONTAL,
            Yoga.POSITION_VERTICAL,
            Yoga.LEFT,
            Yoga.RIGHT,
            Yoga.TOP,
            Yoga.BOTTOM,
            Yoga.START,
            Yoga.END
    );

    /**
     * 数值类型的属性白名单（不需要dp转换）
     */
    private final static List<String> NON_DP_STYLES = new LinkedList<>(Arrays.asList(
            Yoga.ASPECT_RATIO,
            Yoga.FLEX,
            Yoga.FLEX_GROW,
            Yoga.FLEX_SHRINK,
            Hummer.OPACITY,
            Hummer.TEXT_LINE_CLAMP,
            Hummer.LETTER_SPACING,
            Hummer.LINE_SPACING_MULTI,
            Hummer.MAX_LENGTH,
            Hummer.COLUMN
    ));

    /**
     * 数值类型的属性白名单（不需要dp转换）
     */
    private final static List<String> TRANSITION_STYLES = new LinkedList<>(Arrays.asList(
            Yoga.WIDTH,
            Yoga.HEIGHT,
            Hummer.BACKGROUND_COLOR,
            Hummer.OPACITY,
            Hummer.TRANSFORM
    ));

    /**
     * 添加不需要dp转换的样式
     *
     * @param styleName 样式名
     */
    public static void addNonDpStyle(String styleName) {
        if (!NON_DP_STYLES.contains(styleName)) {
            NON_DP_STYLES.add(styleName);
        }
    }

    /**
     * 设置控件样式
     *
     * @param view
     * @param style
     */
    static void applyStyle(HMBase view, Map style) {
        applyStyle(true, view, style);
    }

    // 设置控件样式
    static void applyStyle(boolean needIntercept, HMBase view, Map style) {


        if (view == null || style == null) {
            return;
        }

        Map<String, Object> transitionStyle = new HashMap<>();
        for (Object k : style.keySet()) {
            String key = String.valueOf(k);
            Object value = style.get(k);

            if (needIntercept && HummerLayoutExtendUtils.interceptDisplayStyle(view, key, value)) {
                // 如果需要拦截，并且是Display相关属性，需要先被拦截
                continue;
            } else if (Hummer.POSITION.equals(key) || Hummer.POSITION_TYPE.equals(key) || Hummer.DISPLAY.equals(key)) {
                // 如果是Position或者Display相关属性，优先处理
                if (view.setHummerStyle(key, value)) {
                    continue;
                }
            } else if (key.startsWith(Hummer.TRANSITION)) {
                // transition 参数跳过  在最后处理
                transitionStyle.put(key, value);
                continue;
            }

            try {
                // transform 必须走 animator 进行变化
                if (Hummer.TRANSFORM.equals(key) || (isTransitionStyle(key) && (view.supportTransitionStyle("all") || view.supportTransitionStyle(key)))) {
                    view.handleTransitionStyle(key, value);
                } else if (isYogaStyle(key)) {
                    // 可能需要转换成RTL样式
                    key = toRTLStyleIfNeed(view.getContext(), key);
                    // 处理Yoga支持样式
                    applyYogaStyle(view.getYogaNode(), key, value); // 耗时1ms
                } else {
                    // 处理Hummer自定义样式
                    applyHummerStyle(view, key, value); // 耗时1ms
                }
            } catch (Exception e) {
                // 处理异常信息显示不全的问题，补充异常是在哪个key和value下产生
                String jsStack = ExceptionUtil.getJSErrorStack(view.getJSValue().getJSContext());
                ExceptionUtil.addStackTrace(e, new StackTraceElement("<<JS_Stack>>", "", "\n" + jsStack, -1));
                ExceptionUtil.addStackTrace(e, new StackTraceElement("<<Style>>", "", String.format("%s: %s", key, value), -1));
                HummerException.nativeException(view.getJSValue().getJSContext(), e);
            }
        }
        view.getView().requestLayout();

        // 设置transition样式
        for (Object k : transitionStyle.keySet()) {
            String key = String.valueOf(k);
            Object value = style.get(k);

            view.setTransitionStyle(key, value);
        }

        view.runAnimator();

    }

    private static final String[] paramNames = new String[]{"x", "y", "z"};

    public static Object transformValue(Object object) {

        if (object == null) {
            return object;
        }
        String value = object.toString();
        if (!value.contains(",")) {
            return object;
        }
        String[] params = value.split(",");
        Map map = new HashMap();
        for (int i = 0; i < params.length; i++) {
            map.put(paramNames[i], params[i]);
        }
        return map;
    }

    /**
     * 重置所有样式
     */
    static void resetYogaStyle(HMBase view) {
        if (view == null) {
            return;
        }
        YogaNode node = view.getYogaNode();
        node.setJustifyContent(YogaJustify.FLEX_START);
        node.setAlignContent(YogaAlign.FLEX_START);
        node.setAlignContent(YogaAlign.FLEX_START);
        node.setAlignItems(YogaAlign.STRETCH);
        node.setAlignSelf(YogaAlign.AUTO);
        node.setBorder(YogaEdge.ALL, 0);
        node.setDisplay(YogaDisplay.FLEX);
        node.setFlexBasisAuto();
        node.setFlexDirection(YogaFlexDirection.COLUMN);
        node.setFlexGrow(0);
        node.setFlexShrink(1);
        node.setWrap(YogaWrap.NO_WRAP);
        node.setWidthAuto();
        node.setHeightAuto();
        node.setMaxWidth(Integer.MAX_VALUE);
        node.setMaxHeight(Integer.MAX_VALUE);
        node.setMinWidth(0);
        node.setMinHeight(0);
        node.setMargin(YogaEdge.ALL, 0);
        node.setPadding(YogaEdge.ALL, 0);
        node.setPosition(YogaEdge.ALL, 0);
        node.setPositionType(YogaPositionType.RELATIVE);
    }

    /**
     * 判断是否是Transition支持的样式
     *
     * @param key
     * @return
     */
    private static boolean isTransitionStyle(String key) {
        return TRANSITION_STYLES.contains(key);
    }


    /**
     * 判断是否是Yoga自带的flexbox属性
     *
     * @param key
     * @return
     */
    private static boolean isYogaStyle(String key) {
        return YOGA_STYLES.contains(key);
    }

    /**
     * 是否是需要转换成DP值的样式
     *
     * @param key
     * @return
     */
    private static boolean isDPStyle(String key) {
        return !NON_DP_STYLES.contains(key);
    }

    /**
     * 转换成RTL样式
     *
     * @param key
     */
    static String toRTLStyleIfNeed(Context context, String key) {
        boolean supportRTL = context instanceof HummerContext && HummerSDK.isSupportRTL(((HummerContext) context).getNamespace());
        boolean needRTL = supportRTL && RTLUtil.isRTL(context);
        if (needRTL) {
            if (key.equals(Yoga.LEFT)) {
                key = Yoga.RIGHT;
            } else if (key.equals(Yoga.RIGHT)) {
                key = Yoga.LEFT;
            } else if (key.equals(Yoga.POSITION_LEFT)) {
                key = Yoga.POSITION_RIGHT;
            } else if (key.equals(Yoga.POSITION_RIGHT)) {
                key = Yoga.POSITION_LEFT;
            } else if (key.equals(Yoga.MARGIN_LEFT)) {
                key = Yoga.MARGIN_RIGHT;
            } else if (key.equals(Yoga.MARGIN_RIGHT)) {
                key = Yoga.MARGIN_LEFT;
            } else if (key.equals(Yoga.PADDING_LEFT)) {
                key = Yoga.PADDING_RIGHT;
            } else if (key.equals(Yoga.PADDING_RIGHT)) {
                key = Yoga.PADDING_LEFT;
            }
        }
        return key;
    }

    /**
     * 设置Yoga自带的flexbox属性
     *
     * @param key
     * @param value
     */
    static void applyYogaStyle(YogaNode node, String key, Object value) {
        switch (key) {
            case Yoga.JUSTIFY_CONTENT:
                node.setJustifyContent(YogaJustify.valueOf(toYogaEnumString(value)));
                break;
            case Yoga.ALIGN_CONTENT:
                node.setAlignContent(YogaAlign.valueOf(toYogaEnumString(value)));
                break;
            case Yoga.ALIGN_ITEMS:
                node.setAlignItems(YogaAlign.valueOf(toYogaEnumString(value)));
                break;
            case Yoga.ALIGN_SELF:
                node.setAlignSelf(YogaAlign.valueOf(toYogaEnumString(value)));
                break;
            case Yoga.ASPECT_RATIO:
                node.setAspectRatio(toNumber(key, value));
                break;
            case Yoga.BORDER:
            case Yoga.BORDER_ALL:
                node.setBorder(YogaEdge.ALL, toNumber(key, value));
                break;
            case Yoga.BORDER_LEFT:
                node.setBorder(YogaEdge.LEFT, toNumber(key, value));
                break;
            case Yoga.BORDER_RIGHT:
                node.setBorder(YogaEdge.RIGHT, toNumber(key, value));
                break;
            case Yoga.BORDER_TOP:
                node.setBorder(YogaEdge.TOP, toNumber(key, value));
                break;
            case Yoga.BORDER_BOTTOM:
                node.setBorder(YogaEdge.BOTTOM, toNumber(key, value));
                break;
            case Yoga.BORDER_START:
                node.setBorder(YogaEdge.START, toNumber(key, value));
                break;
            case Yoga.BORDER_END:
                node.setBorder(YogaEdge.END, toNumber(key, value));
                break;
            case Yoga.BORDER_HORIZONTAL:
                node.setBorder(YogaEdge.HORIZONTAL, toNumber(key, value));
                break;
            case Yoga.BORDER_VERTICAL:
                node.setBorder(YogaEdge.VERTICAL, toNumber(key, value));
                break;
            case Yoga.DIRECTION:
                node.setDirection(YogaDirection.valueOf(toYogaEnumString(value)));
                break;
            case Yoga.DISPLAY:
                node.setDisplay(YogaDisplay.valueOf(toYogaEnumString(value)));
                break;
            case Yoga.FLEX:
                node.setFlex(toNumber(key, value));
                break;
            case Yoga.FLEX_BASIS:
                if (isAutoValue(value)) {
                    node.setFlexBasisAuto();
                } else if (isPercentValue(value)) {
                    node.setFlexBasisPercent(toPercent(value));
                } else {
                    node.setFlexBasis(toNumber(key, value));
                }
                break;
            case Yoga.FLEX_DIRECTION:
                node.setFlexDirection(YogaFlexDirection.valueOf(toYogaEnumString(value)));
                break;
            case Yoga.FLEX_GROW:
                node.setFlexGrow(toNumber(key, value));
                break;
            case Yoga.FLEX_SHRINK:
                node.setFlexShrink(toNumber(key, value));
                break;
            case Yoga.FLEX_WRAP:
                node.setWrap(YogaWrap.valueOf(toYogaEnumString(value)));
                break;
            case Yoga.WIDTH:
                if (isAutoValue(value)) {
                    node.setWidthAuto();
                } else if (isPercentValue(value)) {
                    node.setWidthPercent(toPercent(value));
                } else {
                    node.setWidth(toNumber(key, value));
                }
                break;
            case Yoga.HEIGHT:
                if (isAutoValue(value)) {
                    node.setHeightAuto();
                } else if (isPercentValue(value)) {
                    node.setHeightPercent(toPercent(value));
                } else {
                    node.setHeight(toNumber(key, value));
                }
                break;
            case Yoga.MAX_WIDTH:
                if (isAutoValue(value)) {
                    node.setMaxWidth(Integer.MAX_VALUE);
                } else if (isPercentValue(value)) {
                    node.setMaxWidthPercent(toPercent(value));
                } else {
                    node.setMaxWidth(toNumber(key, value));
                }
                break;
            case Yoga.MAX_HEIGHT:
                if (isAutoValue(value)) {
                    node.setMaxHeight(Integer.MAX_VALUE);
                } else if (isPercentValue(value)) {
                    node.setMaxHeightPercent(toPercent(value));
                } else {
                    node.setMaxHeight(toNumber(key, value));
                }
                break;
            case Yoga.MIN_WIDTH:
                if (isAutoValue(value)) {
                    node.setMinWidth(0);
                } else if (isPercentValue(value)) {
                    node.setMinWidthPercent(toPercent(value));
                } else {
                    node.setMinWidth(toNumber(key, value));
                }
                break;
            case Yoga.MIN_HEIGHT:
                if (isAutoValue(value)) {
                    node.setMinHeight(0);
                } else if (isPercentValue(value)) {
                    node.setMinHeightPercent(toPercent(value));
                } else {
                    node.setMinHeight(toNumber(key, value));
                }
                break;
            case Yoga.MARGIN:
            case Yoga.MARGIN_ALL:
                if (isAutoValue(value)) {
                    node.setMarginAuto(YogaEdge.ALL);
                } else if (isPercentValue(value)) {
                    node.setMarginPercent(YogaEdge.ALL, toPercent(value));
                } else {
                    node.setMargin(YogaEdge.ALL, toNumber(key, value));
                }
                break;
            case Yoga.MARGIN_LEFT:
                if (isAutoValue(value)) {
                    node.setMarginAuto(YogaEdge.LEFT);
                } else if (isPercentValue(value)) {
                    node.setMarginPercent(YogaEdge.LEFT, toPercent(value));
                } else {
                    node.setMargin(YogaEdge.LEFT, toNumber(key, value));
                }
                break;
            case Yoga.MARGIN_RIGHT:
                if (isAutoValue(value)) {
                    node.setMarginAuto(YogaEdge.RIGHT);
                } else if (isPercentValue(value)) {
                    node.setMarginPercent(YogaEdge.RIGHT, toPercent(value));
                } else {
                    node.setMargin(YogaEdge.RIGHT, toNumber(key, value));
                }
                break;
            case Yoga.MARGIN_TOP:
                if (isAutoValue(value)) {
                    node.setMarginAuto(YogaEdge.TOP);
                } else if (isPercentValue(value)) {
                    node.setMarginPercent(YogaEdge.TOP, toPercent(value));
                } else {
                    node.setMargin(YogaEdge.TOP, toNumber(key, value));
                }
                break;
            case Yoga.MARGIN_BOTTOM:
                if (isAutoValue(value)) {
                    node.setMarginAuto(YogaEdge.BOTTOM);
                } else if (isPercentValue(value)) {
                    node.setMarginPercent(YogaEdge.BOTTOM, toPercent(value));
                } else {
                    node.setMargin(YogaEdge.BOTTOM, toNumber(key, value));
                }
                break;
            case Yoga.MARGIN_START:
                if (isAutoValue(value)) {
                    node.setMarginAuto(YogaEdge.START);
                } else if (isPercentValue(value)) {
                    node.setMarginPercent(YogaEdge.START, toPercent(value));
                } else {
                    node.setMargin(YogaEdge.START, toNumber(key, value));
                }
                break;
            case Yoga.MARGIN_END:
                if (isAutoValue(value)) {
                    node.setMarginAuto(YogaEdge.END);
                } else if (isPercentValue(value)) {
                    node.setMarginPercent(YogaEdge.END, toPercent(value));
                } else {
                    node.setMargin(YogaEdge.END, toNumber(key, value));
                }
                break;
            case Yoga.MARGIN_HORIZONTAL:
                if (isAutoValue(value)) {
                    node.setMarginAuto(YogaEdge.HORIZONTAL);
                } else if (isPercentValue(value)) {
                    node.setMarginPercent(YogaEdge.HORIZONTAL, toPercent(value));
                } else {
                    node.setMargin(YogaEdge.HORIZONTAL, toNumber(key, value));
                }
                break;
            case Yoga.MARGIN_VERTICAL:
                if (isAutoValue(value)) {
                    node.setMarginAuto(YogaEdge.VERTICAL);
                } else if (isPercentValue(value)) {
                    node.setMarginPercent(YogaEdge.VERTICAL, toPercent(value));
                } else {
                    node.setMargin(YogaEdge.VERTICAL, toNumber(key, value));
                }
                break;
            case Yoga.PADDING:
            case Yoga.PADDING_ALL:
                if (isPercentValue(value)) {
                    node.setPaddingPercent(YogaEdge.ALL, toPercent(value));
                } else {
                    node.setPadding(YogaEdge.ALL, toNumber(key, value));
                }
                break;
            case Yoga.PADDING_LEFT:
                if (isPercentValue(value)) {
                    node.setPaddingPercent(YogaEdge.LEFT, toPercent(value));
                } else {
                    node.setPadding(YogaEdge.LEFT, toNumber(key, value));
                }
                break;
            case Yoga.PADDING_RIGHT:
                if (isPercentValue(value)) {
                    node.setPaddingPercent(YogaEdge.RIGHT, toPercent(value));
                } else {
                    node.setPadding(YogaEdge.RIGHT, toNumber(key, value));
                }
                break;
            case Yoga.PADDING_TOP:
                if (isPercentValue(value)) {
                    node.setPaddingPercent(YogaEdge.TOP, toPercent(value));
                } else {
                    node.setPadding(YogaEdge.TOP, toNumber(key, value));
                }
                break;
            case Yoga.PADDING_BOTTOM:
                if (isPercentValue(value)) {
                    node.setPaddingPercent(YogaEdge.BOTTOM, toPercent(value));
                } else {
                    node.setPadding(YogaEdge.BOTTOM, toNumber(key, value));
                }
                break;
            case Yoga.PADDING_START:
                if (isPercentValue(value)) {
                    node.setPaddingPercent(YogaEdge.START, toPercent(value));
                } else {
                    node.setPadding(YogaEdge.START, toNumber(key, value));
                }
                break;
            case Yoga.PADDING_END:
                if (isPercentValue(value)) {
                    node.setPaddingPercent(YogaEdge.END, toPercent(value));
                } else {
                    node.setPadding(YogaEdge.END, toNumber(key, value));
                }
                break;
            case Yoga.PADDING_HORIZONTAL:
                if (isPercentValue(value)) {
                    node.setPaddingPercent(YogaEdge.HORIZONTAL, toPercent(value));
                } else {
                    node.setPadding(YogaEdge.HORIZONTAL, toNumber(key, value));
                }
                break;
            case Yoga.PADDING_VERTICAL:
                if (isPercentValue(value)) {
                    node.setPaddingPercent(YogaEdge.VERTICAL, toPercent(value));
                } else {
                    node.setPadding(YogaEdge.VERTICAL, toNumber(key, value));
                }
                break;
            case Yoga.POSITION:
            case Yoga.POSITION_TYPE:
                node.setPositionType(YogaPositionType.valueOf(toYogaEnumString(value)));
                break;
            case Yoga.POSITION_ALL:
                if (isPercentValue(value)) {
                    node.setPositionPercent(YogaEdge.ALL, toPercent(value));
                } else {
                    node.setPosition(YogaEdge.ALL, toNumber(key, value));
                }
                break;
            case Yoga.LEFT:
            case Yoga.POSITION_LEFT:
                if (isPercentValue(value)) {
                    node.setPositionPercent(YogaEdge.LEFT, toPercent(value));
                } else {
                    node.setPosition(YogaEdge.LEFT, toNumber(key, value));
                }
                break;
            case Yoga.RIGHT:
            case Yoga.POSITION_RIGHT:
                if (isPercentValue(value)) {
                    node.setPositionPercent(YogaEdge.RIGHT, toPercent(value));
                } else {
                    node.setPosition(YogaEdge.RIGHT, toNumber(key, value));
                }
                break;
            case Yoga.TOP:
            case Yoga.POSITION_TOP:
                if (isPercentValue(value)) {
                    node.setPositionPercent(YogaEdge.TOP, toPercent(value));
                } else {
                    node.setPosition(YogaEdge.TOP, toNumber(key, value));
                }
                break;
            case Yoga.BOTTOM:
            case Yoga.POSITION_BOTTOM:
                if (isPercentValue(value)) {
                    node.setPositionPercent(YogaEdge.BOTTOM, toPercent(value));
                } else {
                    node.setPosition(YogaEdge.BOTTOM, toNumber(key, value));
                }
                break;
            case Yoga.START:
            case Yoga.POSITION_START:
                if (isPercentValue(value)) {
                    node.setPositionPercent(YogaEdge.START, toPercent(value));
                } else {
                    node.setPosition(YogaEdge.START, toNumber(key, value));
                }
                break;
            case Yoga.END:
            case Yoga.POSITION_END:
                if (isPercentValue(value)) {
                    node.setPositionPercent(YogaEdge.END, toPercent(value));
                } else {
                    node.setPosition(YogaEdge.END, toNumber(key, value));
                }
                break;
            case Yoga.POSITION_HORIZONTAL:
                if (isPercentValue(value)) {
                    node.setPositionPercent(YogaEdge.HORIZONTAL, toPercent(value));
                } else {
                    node.setPosition(YogaEdge.HORIZONTAL, toNumber(key, value));
                }
                break;
            case Yoga.POSITION_VERTICAL:
                if (isPercentValue(value)) {
                    node.setPositionPercent(YogaEdge.VERTICAL, toPercent(value));
                } else {
                    node.setPosition(YogaEdge.VERTICAL, toNumber(key, value));
                }
                break;
            default:
                break;
        }
    }

    /**
     * 设置Hummer自定义属性
     *
     * @param view
     * @param key
     * @param value
     */
    private static void applyHummerStyle(HMBase view, String key, Object value) {
        // TODO: 改成编译时自动生成setStyle代码
        view.setHummerStyle(key, convertValue(key, value));
    }

    /**
     * 转换成数值属性值（会考虑dp的转换）
     *
     * @param key
     * @param value
     * @return
     */
    private static float toNumber(String key, Object value) {
        return convertNumber(value, isDPStyle(key));
    }

    /**
     * 转换成Yoga支持的字符串属性值
     *
     * @param value
     * @return
     */
    private static String toYogaEnumString(Object value) {
        String enumStr = String.valueOf(value).toUpperCase();
        // 部分属性值特殊处理
        if (enumStr.equals("NOWRAP")) {
            return "NO_WRAP";
        }
        return enumStr.replace("-", "_");
    }

    /**
     * 转换成百分比属性值
     *
     * @param value
     * @return
     */
    public static float toPercent(Object value) {
        if (!isPercentValue(value)) {
            return 0;
        }
        String percentStr = String.valueOf(value);
        return Float.parseFloat(percentStr.substring(0, percentStr.length() - 1));
    }

    /**
     * 转换属性值到正确的格式（这里的逻辑没有过多封装，是为了不做多余的类型判断，提高性能）
     *
     * @param value
     * @return
     */
    public static Object convertValue(String key, Object value) {
        if (value instanceof String) {
            String strValue = (String) value;
            if (strValue.startsWith("#")) {
                value = YogaAttrUtils.parseColor(strValue); // 耗时1ms
            } else if (strValue.startsWith("linear-gradient")) {
                value = YogaAttrUtils.parseLinearGradientColor(strValue);
            } else {
                try {
                    // 这里使用try-catch而不是直接通过正则判断是否是数字类型，是为了性能考虑
                    value = convertNumber(value, isDPStyle(key)); // 耗时1ms
                } catch (Exception e) {
                    // 普通字符串属性值，不做处理，返回原值
                }
            }
        } else if (value instanceof Number) {
            value = convertNumber(value, isDPStyle(key));
        }
        return value;
    }

    /**
     * 转换颜色值
     * <p>
     * '#FF000060' -> 0x60FF0000
     * 'linear-gradient(90deg #FF000060 #00FF0060)' -> [90, 0x60FF0000, 0x6000FF00]
     *
     * @param color
     * @return
     */
    public static Object convertColor(Object color) {
        if (color instanceof String) {
            String strColor = (String) color;
            if (YogaAttrUtils.isColor(strColor)) { // 耗时1~2ms
                return YogaAttrUtils.parseColor(strColor);
            } else if (YogaAttrUtils.isLinearGradientColor(strColor)) {
                return YogaAttrUtils.parseLinearGradientColor(strColor);
            }
        }
        return Color.TRANSPARENT;
    }

    /**
     * 转换数值（默认需要DP值转换）
     *
     * @param number
     * @return
     */
    public static float convertNumber(Object number) {
        return convertNumber(number, true);
    }

    /**
     * 转换数值
     * <p>
     * 0.2 -> 0.2
     * '0.2' -> 0.2
     * 10 -> 30 (px)
     * '10' -> 30 (px)
     * '10px' -> 10 (px)
     *
     * @param number
     * @param isDPStyle 是否需要DP值转换
     * @return
     */
    public static float convertNumber(Object number, boolean isDPStyle) throws RuntimeException {
        float value = 0f;
        if (number instanceof Number) {
            if (isDPStyle) {
                value = DPUtil.dp2px(HummerSDK.appContext, ((Number) number).floatValue());
            } else {
                value = ((Number) number).floatValue();
            }
        } else if (number instanceof String) {
            String attr = (String) number;
            boolean isPx = false;
            boolean isHm = false;
            if (attr.endsWith("px") || attr.endsWith("PX")) {
                attr = attr.substring(0, attr.length() - 2);
                isPx = true;
            } else if (attr.endsWith("hm") || attr.endsWith("HM")) {
                attr = attr.substring(0, attr.length() - 2);
                isHm = true;
            }
            value = Float.parseFloat(attr);
            if (isHm) {
                value = RemUtil.rem2px(value);
            } else if (!isPx && isDPStyle) {
                value = DPUtil.dp2px(HummerSDK.appContext, value);
            }
        }
        return value;
    }

    /**
     * 是否是颜色值
     *
     * @param value
     * @return
     */
    public static boolean isColorValue(Object value) {
        if (value instanceof String) {
            String color = (String) value;
            return YogaAttrUtils.isColor(color) || YogaAttrUtils.isLinearGradientColor(color);
        }
        return false;
    }

    /**
     * 是否是数值
     *
     * @param value
     * @return
     */
    public static boolean isNumberValue(Object value) {
        if (value instanceof String) {
            String number = (String) value;
            return YogaAttrUtils.isNumeric(number) || YogaAttrUtils.isPxNumeric(number) || YogaAttrUtils.isHmNumeric(number);
        }
        return value instanceof Number;
    }

    /**
     * 是否是"auto"形式的属性值
     *
     * @param value
     * @return
     */
    public static boolean isAutoValue(Object value) {
        return value instanceof String && ((String) value).toLowerCase().equals("auto");
    }

    /**
     * 是否是"%"形式的属性值
     *
     * @param value
     * @return
     */
    public static boolean isPercentValue(Object value) {
        return value instanceof String && ((String) value).endsWith("%");
    }
}
