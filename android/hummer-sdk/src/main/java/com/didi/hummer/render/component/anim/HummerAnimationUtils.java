package com.didi.hummer.render.component.anim;

import android.animation.ArgbEvaluator;
import android.animation.PropertyValuesHolder;
import android.animation.TimeInterpolator;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.LinearInterpolator;

import com.didi.hummer.render.style.HummerStyleUtils;
import com.didi.hummer.render.utility.YogaAttrUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class HummerAnimationUtils {


    public static final int AXIS_X = 1;
    public static final int AXIS_Y = 2;
    public static final int AXIS_Z = 3;

    public static final int DIRECTION_X = 11;
    public static final int DIRECTION_Y = 12;
    public static final int DIRECTION_XY = 13;

    public static long getAnimDuration(float duration) {
        return (long) (duration * 1000);
    }

    public static int getAnimDelay(float delay) {
        return (int) (delay * 1000);
    }

    public static TimeInterpolator getInterpolator(String easing) {
        if ("linear".equalsIgnoreCase(easing)) {
            return new LinearInterpolator();
        } else if ("ease-in".equalsIgnoreCase(easing)) {
            return new AccelerateInterpolator();
        } else if ("ease-out".equalsIgnoreCase(easing)) {
            return new DecelerateInterpolator();
        } else if ("ease-in-out".equalsIgnoreCase(easing)) {
            return new AccelerateDecelerateInterpolator();
        } else {
            return new AccelerateDecelerateInterpolator();
        }
    }

    public static List<PropertyValuesHolder> parser(String animType, Object value) {
        return parser(animType, value, null);
    }

    public static List<PropertyValuesHolder> parser(String animType, Object value, Object from) {
        if ("position".equalsIgnoreCase(animType) || "translate".equalsIgnoreCase(animType)) {
            return animTranslation(value, from);
        } else if ("opacity".equalsIgnoreCase(animType)) {
            return animAlpha(value, from);
        } else if ("scale".equalsIgnoreCase(animType)) {
            return animScale(value, from, DIRECTION_XY);
        } else if ("scaleX".equalsIgnoreCase(animType)) {
            return animScale(value, from, DIRECTION_X);
        } else if ("scaleY".equalsIgnoreCase(animType)) {
            return animScale(value, from, DIRECTION_Y);
        } else if ("rotateX".equalsIgnoreCase(animType) || "rotationX".equalsIgnoreCase(animType)) {
            return animRotation(value, from, AXIS_X);
        } else if ("rotateY".equalsIgnoreCase(animType) || "rotationY".equalsIgnoreCase(animType)) {
            return animRotation(value, from, AXIS_Y);
        } else if ("rotate".equalsIgnoreCase(animType) || "rotateZ".equalsIgnoreCase(animType) || "rotation".equalsIgnoreCase(animType) || "rotationZ".equalsIgnoreCase(animType)) {
            return animRotation(value, from, AXIS_Z);
        } else if ("backgroundColor".equalsIgnoreCase(animType)) {
            return animBackgroundColor(value, from);
        } else if ("width".equalsIgnoreCase(animType)) {
            return animWidth(value, from);
        } else if ("height".equalsIgnoreCase(animType)) {
            return animHeight(value, from);
        } else if ("skew".equalsIgnoreCase(animType)) {
            return animSkew(value, from);
        }
        return new ArrayList<>();
    }


    protected static Object[] trans2Array(Object value) {
        Object[] array = null;
        if (value instanceof Map) {
            Map map = (Map) value;
            array = new Object[2];
            Object objX = map.get("x");
            Object objY = map.get("y");
            array[0] = objX;
            array[1] = objY;
        }
        return array;
    }

    /**
     * 平移动画
     */
    private static List<PropertyValuesHolder> animTranslation(Object value, Object from) {

        float[] vs = null;
        Object[] valueArray = trans2Array(value);
        if (valueArray != null && valueArray.length == 2) {
            vs = new float[2];
            vs[0] = HummerStyleUtils.convertNumber(valueArray[0]);
            vs[1] = HummerStyleUtils.convertNumber(valueArray[1]);
        }

        if (vs == null) {
            return new ArrayList<>();
        }

        float[] fs = null;
        Object[] fromArray = trans2Array(from);
        if (fromArray != null && fromArray.length == 2) {
            fs = new float[2];
            fs[0] = HummerStyleUtils.convertNumber(fromArray[0]);
            fs[1] = HummerStyleUtils.convertNumber(fromArray[1]);
        }

        List<PropertyValuesHolder> list = new ArrayList<>();
        if (fs != null) {
            PropertyValuesHolder holderX = PropertyValuesHolder.ofFloat("translationX", fs[0], vs[0]);
            PropertyValuesHolder holderY = PropertyValuesHolder.ofFloat("translationY", fs[1], vs[1]);
            list.add(holderX);
            list.add(holderY);
        } else {
            PropertyValuesHolder holderX = PropertyValuesHolder.ofFloat("translationX", vs[0]);
            PropertyValuesHolder holderY = PropertyValuesHolder.ofFloat("translationY", vs[1]);
            list.add(holderX);
            list.add(holderY);
        }

        return list;
    }


    /**
     * 透明度动画
     */
    private static List<PropertyValuesHolder> animAlpha(Object value, Object from) {
        List<PropertyValuesHolder> list = new ArrayList<>();
        if (value == null) {
            return list;
        }

        float v = HummerStyleUtils.convertNumber(value, false);


        PropertyValuesHolder holder;
        if (from != null) {
            float f = HummerStyleUtils.convertNumber(from, false);
            holder = PropertyValuesHolder.ofFloat("alpha", f, v);
        } else {
            holder = PropertyValuesHolder.ofFloat("alpha", v);
        }
        list.add(holder);
        return list;
    }


    /**
     * 缩放动画
     */
    private static List<PropertyValuesHolder> animScale(Object value, Object from, int direction) {
        List<PropertyValuesHolder> list = new ArrayList<>();
        if (value == null) {
            return list;
        }

        float[] vs = null;
        Object[] valueArray = trans2Array(value);
        // transform动画数组传参为x:1,y:1形式
        if (valueArray != null && valueArray.length == 2 && direction == DIRECTION_XY) {
            vs = new float[2];
            vs[0] = HummerStyleUtils.convertNumber(valueArray[0], false);
            vs[1] = HummerStyleUtils.convertNumber(valueArray[1], false);

            list.add(PropertyValuesHolder.ofFloat("scaleX", vs[0]));
            list.add(PropertyValuesHolder.ofFloat("scaleY", vs[1]));
            return list;
        }

        float f = HummerStyleUtils.convertNumber(from, false);
        float v = HummerStyleUtils.convertNumber(value, false);
        switch (direction) {
            case DIRECTION_X:
                if (from != null) {
                    list.add(PropertyValuesHolder.ofFloat("scaleX", f, v));
                } else {
                    list.add(PropertyValuesHolder.ofFloat("scaleX", v));
                }
                break;
            case DIRECTION_Y:
                if (from != null) {
                    list.add(PropertyValuesHolder.ofFloat("scaleY", f, v));
                } else {
                    list.add(PropertyValuesHolder.ofFloat("scaleY", v));
                }
                break;
            case DIRECTION_XY:
            default:
                if (from != null) {
                    list.add(PropertyValuesHolder.ofFloat("scaleX", f, v));
                    list.add(PropertyValuesHolder.ofFloat("scaleY", f, v));
                } else {
                    list.add(PropertyValuesHolder.ofFloat("scaleX", v));
                    list.add(PropertyValuesHolder.ofFloat("scaleY", v));
                }
                break;
        }
        return list;
    }

    /**
     * 旋转动画
     */
    private static List<PropertyValuesHolder> animRotation(Object value, Object from, int axis) {
        List<PropertyValuesHolder> list = new ArrayList<>();
        if (value == null) {
            return list;
        }

        String animName;
        switch (axis) {
            case AXIS_X:
                animName = "rotationX";
                break;
            case AXIS_Y:
                animName = "rotationY";
                break;
            case AXIS_Z:
            default:
                animName = "rotation";
                break;
        }

        float f = HummerStyleUtils.convertNumber(from, false);
        float v = HummerStyleUtils.convertNumber(value, false);


        if (from != null) {
            list.add(PropertyValuesHolder.ofFloat(animName, f, v));
        } else {
            list.add(PropertyValuesHolder.ofFloat(animName, v));
        }

        return list;
    }

    /**
     * 背景颜色渐变动画
     */
    private static List<PropertyValuesHolder> animBackgroundColor(Object value, Object from) {
        List<PropertyValuesHolder> list = new ArrayList<>();
        if (value == null) {
            return list;
        }

        int f = YogaAttrUtils.parseColor(String.valueOf(from));
        int v = YogaAttrUtils.parseColor(String.valueOf(value));

        if (from != null) {
            list.add(PropertyValuesHolder.ofObject("backgroundColor", new ArgbEvaluator(), f, v));
        } else {
            list.add(PropertyValuesHolder.ofObject("backgroundColor", new ArgbEvaluator(), v));
        }

        return list;
    }

    /**
     * 控件宽度动画
     */
    protected static List<PropertyValuesHolder> animWidth(Object value, Object from) {

        List<PropertyValuesHolder> list = new ArrayList<>();
        if (value == null) {
            return list;
        }

        int v = (int) HummerStyleUtils.convertNumber(value);

        if (from == null) {
            PropertyValuesHolder holderWidth = PropertyValuesHolder.ofInt("width", v);
            list.add(holderWidth);
        } else {
            int f = (int) HummerStyleUtils.convertNumber(from);

            if (f == v) {
                return list;
            }

            PropertyValuesHolder holderWidth = PropertyValuesHolder.ofInt("width", f, v);
            list.add(holderWidth);
        }


        return list;

    }


    /**
     * 控件高度动画
     */
    protected static List<PropertyValuesHolder> animHeight(Object value, Object from) {
        List<PropertyValuesHolder> list = new ArrayList<>();
        if (value == null) {
            return list;
        }

        int v = (int) HummerStyleUtils.convertNumber(value);

        if (from == null) {
            PropertyValuesHolder holderWidth = PropertyValuesHolder.ofInt("height", v);
            list.add(holderWidth);
        } else {
            int f = (int) HummerStyleUtils.convertNumber(from);

            if (f == v) {
                return list;
            }

            PropertyValuesHolder holderWidth = PropertyValuesHolder.ofInt("height", f, v);
            list.add(holderWidth);
        }


        return list;
    }

    /**
     * 控件错切变换
     */
    protected static List<PropertyValuesHolder> animSkew(Object value, Object from) {
        List<PropertyValuesHolder> list = new ArrayList<>();
        if (value == null) {
            return list;
        }

        float[] vs = null;
        Object[] valueArray = trans2Array(value);
        if (valueArray != null && valueArray.length == 2) {
            vs = new float[2];
            vs[0] = HummerStyleUtils.convertNumber(valueArray[0], false);
            vs[1] = HummerStyleUtils.convertNumber(valueArray[1], false);
        }

        PropertyValuesHolder holderY = PropertyValuesHolder.ofFloat("skewY", (float) Math.tan(Math.toRadians(vs[1])));
        PropertyValuesHolder holderX = PropertyValuesHolder.ofFloat("skewX", (float) Math.tan(Math.toRadians(vs[0])));

        list.add(holderX);
        list.add(holderY);
        return list;
    }
}
