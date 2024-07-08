package com.didi.hummer2.bridge.convert;

import static com.google.gson.internal.$Gson$Preconditions.checkArgument;
import static com.google.gson.internal.$Gson$Preconditions.checkNotNull;

import android.text.TextUtils;

import com.didi.hummer2.bridge.JsiArray;
import com.didi.hummer2.bridge.JsiBoolean;
import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiString;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.bridge.JsiValueBuilder;
import com.google.gson.internal.$Gson$Types;

import java.io.Serializable;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * didi Create on 2024/7/3 .
 * <p>
 * Copyright (c) 2024/7/3 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/3 12:17 PM
 * @Description 用一句话说明文件功能
 */

public abstract class ValueParser {


    private final JsiValueBuilder jsiValueBuilder;


    protected ValueParser(JsiValueBuilder jsiValueBuilder) {
        this.jsiValueBuilder = jsiValueBuilder;
    }

    public abstract HummerJsiValueRegister getJsiValueRegister();

    /**
     * 转化为Java数据模型
     *
     * @param jsiValue jsiValue数据
     * @param type     java数据类型
     * @param <T>
     * @return 可能会类型转换错误
     */
    public <T> T toJavaValue(JsiValue jsiValue, Type type) {
        if (jsiValue != null) {
            Object result;
            if (type == null || type == Object.class) {
                result = toJavaValue(jsiValue);
            } else if (type == String.class) {
                result = optString(jsiValue);
            } else if (type == Boolean.class) {
                result = optBoolean(jsiValue);
            } else if (isInteger(type)) {
                result = optLong(jsiValue);
            } else if (isNumber(type)) {
                result = optDouble(jsiValue);
            } else {
                result = getJsiValueRegister().toJavaValue(this, jsiValue, type);
            }
            if (result != null) {
                return (T) result;
            }
        }
        return null;
    }

    protected boolean isInteger(Type type) {
        if (type == Integer.class || type == Long.class || type == BigInteger.class) {
            return true;
        }
        return false;
    }

    protected boolean isNumber(Type type) {
        if (type == Number.class || type == Float.class || type == Double.class) {
            return true;
        }
        return false;
    }

    public Object toJavaValue(JsiValue object) {
        Type type = null;
        if (object instanceof JsiString) {
            type = String.class;
        } else if (object instanceof JsiBoolean) {
            type = Boolean.class;
        } else if (object instanceof JsiObject) {
            type = Map.class;
        } else if (object instanceof JsiArray) {
            type = List.class;
        } else if (object instanceof JsiNumber) {
            JsiNumber jsiNumber = (JsiNumber) object;
            if (jsiNumber.isInteger()) {
                type = Long.class;
            } else {
                type = Double.class;
            }
        }
        if (type == null) {
            return null;
        }
        return toJavaValue(object, type);
    }


//    public static Object toJavaValue(JsiValue object) {
//        if (object != null) {
//            if (object instanceof JsiNumber) {
//                JsiNumber jsiNumber = (JsiNumber) object;
//                Object result;
//                if (jsiNumber.isInteger()) {
//                    result = jsiNumber.valueLong();
//                } else {
//                    result = jsiNumber.valueDouble();
//                }
//                return result;
//            }
//            if (object instanceof JsiString) {
//                Object result = ((JsiString) object).valueString();
//                return result;
//            }
//            if (object instanceof JsiBoolean) {
//                Object result = ((JsiBoolean) object).getValue();
//                return result;
//            }
//            if (object instanceof JsiObject) {
//                JsiObject jsiObject = (JsiObject) object;
//                List<String> keys = jsiObject.keys();
//                Map<String, Object> result = new HashMap<>();
//                for (String key : keys) {
//                    result.put(key, toJavaValue(jsiObject.get(key)));
//                }
//                return result;
//            }
//            if (object instanceof JsiArray) {
//                JsiArray jsiArray = (JsiArray) object;
//                int size = jsiArray.length();
//                List<Object> result = new ArrayList<>();
//                for (int i = 0; i < size; i++) {
//                    result.add(toJavaValue(jsiArray.getValue(i)));
//                }
//                return result;
//            }
//            return object;
//        }
//        return null;
//    }

    /**
     * 将普通数据类型转换为JsiValue标准类型
     *
     * @param value Java数据
     * @return 标准数据JsiValue
     */
    public JsiValue toJsiValue(Object value) {
        if (value == null) {
            return null;
        }
        //Jsi直接转换
        if (value instanceof JsiValue) {
            return toJsiValue((JsiValue) value);
        }
        //基础类型直接转换
        if (value instanceof Number) {
            return newJsiNumber(((Number) value).doubleValue());
        }
        if (value instanceof String) {
            return newJsiString((String) value);
        }
        if (value instanceof Boolean) {
            return newJsiBoolean((Boolean) value);
        }
        //其他数据模型转换
        JsiValue jsiValue = getJsiValueRegister().toJsiValue(this, value);
        return jsiValue;
    }

    /**
     * 不支持JsiFunction转换，转换后为null。
     */
    public JsiValue toJsiValue(JsiValue jsiValue) {
        if (jsiValue != null) {
            if (jsiValue instanceof JsiBoolean) {
                return newJsiBoolean(((JsiBoolean) jsiValue).getValue());
            }
            if (jsiValue instanceof JsiNumber) {
                return newJsiNumber(((JsiNumber) jsiValue).getValue());
            }
            if (jsiValue instanceof JsiString) {
                return newJsiString(((JsiString) jsiValue).getValue());
            }
            if (jsiValue instanceof JsiObject) {
                return toJsiValueObj((JsiObject) jsiValue);
            }
            if (jsiValue instanceof JsiArray) {
                return toJsiValueArr((JsiArray) jsiValue);
            }
        }
        return null;
    }


    private JsiObject toJsiValueObj(JsiObject jsiValue) {
        JsiObject jsiObject = newJsiObject();
        List<String> keys = jsiValue.keys();
        for (String key : keys) {
            jsiObject.put(key, toJsiValue(jsiValue.get(key)));
        }
        return jsiObject;
    }

    private JsiArray toJsiValueArr(JsiArray jsiValue) {
        JsiArray jsiArray = newJsiArray();
        int size = jsiValue.length();
        for (int i = 0; i < size; i++) {
            jsiArray.push(toJsiValue(jsiValue.getValue(i)));
        }
        return jsiArray;
    }


    public JsiString newJsiString(String value) {
        return jsiValueBuilder.newJsiString(value);
    }

    public JsiNumber newJsiNumber(double value) {
        return jsiValueBuilder.newJsiNumber(value);
    }

    public JsiBoolean newJsiBoolean(boolean value) {
        return jsiValueBuilder.newJsiBoolean(value);
    }

    public JsiObject newJsiObject() {
        return jsiValueBuilder.newJsiObject();
    }

    public JsiArray newJsiArray() {
        return jsiValueBuilder.newJsiArray();
    }

    public String optString(JsiValue jsiValue) {
        if (jsiValue instanceof JsiString) {
            return ((JsiString) jsiValue).valueString();
        }
        return null;
    }

    public boolean optBoolean(JsiValue jsiValue) {
        if (jsiValue instanceof JsiBoolean) {
            return ((JsiBoolean) jsiValue).getValue();
        }
        return false;
    }

    public int optInt(JsiValue jsiValue) {
        if (jsiValue instanceof JsiNumber) {
            return ((JsiNumber) jsiValue).valueInt();
        }
        return 0;
    }

    public long optLong(JsiValue jsiValue) {
        if (jsiValue instanceof JsiNumber) {
            return ((JsiNumber) jsiValue).valueLong();
        }
        return 0;
    }

    public float optFloat(JsiValue jsiValue) {
        if (jsiValue instanceof JsiNumber) {
            return ((JsiNumber) jsiValue).valueFloat();
        }
        return 0;
    }

    public double optDouble(JsiValue jsiValue) {
        if (jsiValue instanceof JsiNumber) {
            return ((JsiNumber) jsiValue).valueDouble();
        }
        return 0;
    }


    /**
     * @param type
     * @param classT
     * @param args
     * @return
     */
    public Type getParameterizedType(Type type, Class classT, Object... args) {

        if (type != null && classT != null) {
            int size = args.length;
            Type[] types = new Type[size];
            for (int i = 0; i < size; i++) {
                Object typeT = args[i];
                if (typeT instanceof Type) {
                    types[i] = (Type) typeT;
                } else {
                    types[i] = getArgumentType(type, (int) typeT);
                }
            }
            return Types.buildParameterizedType(type, classT, types);
        }
        return null;
    }



    /**
     * 根据泛型index获取泛型变量的实际类型
     *
     * @param type 类/类型   List.class Map.class
     * @param index 泛型index
     * @return 类/类型
     */
    public Type getArgumentType(Type type, int index) {
        if (type instanceof ParameterizedType) {
            Type[] types = ((ParameterizedType) type).getActualTypeArguments();
            if (index >= 0 && index < types.length) {
                return types[index];
            }
        }
        return null;
    }

    /**
     * 根据泛型名称获取泛型变量的实际类型
     *
     * @param type 类/类型  List.class Map.class
     * @param name 泛型名称 T,DATA
     * @return 类/类型
     */
    public Type getArgumentType(Type type, String name) {
        if (type instanceof ParameterizedType) {
            Type[] types = ((ParameterizedType) type).getActualTypeArguments();
            int index = getArgumentTypeIndexOf(type, name);
            if (index >= 0 && index < types.length) {
                return types[index];
            }
        }
        return null;
    }

    public int getArgumentTypeIndexOf(Type type, String name) {
        if (!TextUtils.isEmpty(name)) {
            if (type instanceof ParameterizedType) {
                Class classT = (Class) ((ParameterizedType) type).getRawType();
                TypeVariable[] typeVariables = classT.getTypeParameters();
                int size = typeVariables.length;
                for (int i = 0; i < size; i++) {
                    TypeVariable typeVar = typeVariables[i];
                    if (TextUtils.equals(typeVar.getName(), name)) {
                        return i;
                    }
                }
            }
        }
        return -1;
    }





}
