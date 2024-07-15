package com.didi.hummer2.compiler;

import com.didi.hummer2.annotation.HMJsiName;
import com.squareup.javapoet.ClassName;
import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.MethodSpec;
import com.squareup.javapoet.ParameterizedTypeName;
import com.squareup.javapoet.TypeName;
import com.squareup.javapoet.TypeSpec;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.processing.Filer;
import javax.annotation.processing.ProcessingEnvironment;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
import javax.lang.model.type.DeclaredType;
import javax.lang.model.type.TypeKind;
import javax.lang.model.type.TypeMirror;
import javax.lang.model.type.TypeVariable;
import javax.lang.model.type.WildcardType;
import javax.lang.model.util.Elements;
import javax.lang.model.util.Types;

/**
 * didi Create on 2024/7/4 .
 * <p>
 * Copyright (c) 2024/7/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/4 8:16 PM
 * @Description JsiValueAdapter 代码生成（模型数据转换实现）
 */
public class JsiValueAdapterClassCreator {
    private Elements elementUtils;
    private Types typeUtils;
    private Filer filer;
    private Logger logger;
    private TypeElement classElement;
    private String packageName;
    private String className;
    private ClassName thisClass;
    private TypeName baseInvokerT;
    private TypeMirror thisClassType;
    private List<? extends TypeMirror> thisClassTypeArguments = null;

    public JsiValueAdapterClassCreator(ProcessingEnvironment processingEnv) {
        elementUtils = processingEnv.getElementUtils();
        typeUtils = processingEnv.getTypeUtils();
        filer = processingEnv.getFiler();
        logger = new Logger(processingEnv.getMessager());
    }

    public JsiValueAdapterClassCreator processClass(TypeElement classElement) {
        logger.info("[adapter] Class: " + classElement.getQualifiedName() + " extends " + classElement.getSuperclass());
        this.classElement = classElement;
        packageName = elementUtils.getPackageOf(classElement).getQualifiedName().toString();
        className = classElement.getSimpleName().toString();
        thisClass = ClassName.get(packageName, className);
        baseInvokerT = ParameterizedTypeName.get(TypeUtil.baseAdapter, thisClass); // 泛型

        thisClassType = classElement.asType();
        if (thisClassType.getKind() == TypeKind.DECLARED) {
            DeclaredType declaredType = (DeclaredType) thisClassType;
            thisClassTypeArguments = declaredType.getTypeArguments();
        }
        return this;
    }

    private int findTypeArgumentsOfIndex(TypeMirror variableType) {
        if (thisClassTypeArguments != null && thisClassTypeArguments.size() > 0) {
            int size = thisClassTypeArguments.size();
            for (int i = 0; i < size; i++) {
                if (variableType.toString().equals(thisClassTypeArguments.get(i).toString())) {
                    return i;
                }
            }
        }
        return -1;
    }

    public void create() {
        JavaFile javaFile = JavaFile.builder(packageName, generateJavaClass()).build();
        try {
            javaFile.writeTo(filer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private TypeSpec generateJavaClass() {
        TypeSpec.Builder builder = TypeSpec.classBuilder(className + Constant.SUFFIX_OF_ADAPTER_FILE)
                // public 修饰类
                .addModifiers(Modifier.PUBLIC).superclass(baseInvokerT)
                // 添加类的方法
                .addMethod(generateGetClassNameMethod())
                // 添加类的方法
                .addMethod(generateToJavaValueMethod())
                // 添加类的方法
                .addMethod(generateToJsiValueMethod());

        // 构建Java类
        return builder.build();
    }

    private MethodSpec generateGetClassNameMethod() {
        final ClassName ClassT = ClassName.get("java.lang", "Class");
        final TypeName classType = ParameterizedTypeName.get(ClassT, thisClass); // 泛型

        return MethodSpec.methodBuilder("getJavaClass").addAnnotation(Override.class).addModifiers(Modifier.PUBLIC).returns(classType).addStatement("return $T.class", thisClass).build();
    }

    private MethodSpec generateToJavaValueMethod() {
        MethodSpec.Builder myMethod = MethodSpec.methodBuilder("toJavaValue").addAnnotation(Override.class).addModifiers(Modifier.PUBLIC).returns(thisClass).addParameter(TypeUtil.ValueParser, "parser").addParameter(TypeUtil.JsiValue, "jsiValue").addParameter(TypeUtil.Type, "type");

        ExecutableElement constructor = TypeUtil.getConstructor(classElement);
        List<? extends VariableElement> methodParameters = constructor.getParameters();

        if (methodParameters.size() == 0) {
            myMethod.addStatement("$T result = new $T()", thisClass, thisClass);
        } else if (methodParameters.size() == 1) {
            myMethod.addStatement("$T result = new $T(null)", classElement, classElement);
        } else {
            myMethod.addStatement("$T result = new $T(null, null)", classElement, classElement);
        }
        myMethod.addStatement("$T jsiObject = ($T)jsiValue", TypeUtil.JsiObject, TypeUtil.JsiObject);

        List<? extends Element> allMembers = getClassAllElements(classElement);
        for (Element member : allMembers) {
            if (member.getKind() == ElementKind.FIELD) {
                if (isStatic(member)){
                    continue;
                }
                HMJsiName annotation = member.getAnnotation(HMJsiName.class);
                String fieldName = member.getSimpleName().toString();
                String annotationName = "";
                String keyName = fieldName;
                String setFuncName = "set" + upperCase(fieldName);
                VariableElement variableElement = (VariableElement) member;
                if (annotation != null) {
                    annotationName = annotation.value();
                    if (annotationName != null && annotationName.length() > 0) {
                        keyName = annotationName;
                    }
                }
                // set方法
                ExecutableElement setElement = pickMethod(allMembers, setFuncName);

                generateEachVariableSetCase(myMethod, variableElement, fieldName, keyName, setElement);
            }
        }

        myMethod.addStatement("return result");
        return myMethod.build();
    }


    private void generateEachVariableSetCase(MethodSpec.Builder myMethod, VariableElement variableElement, String fieldName, String keyName, ExecutableElement setElement) {
        TypeMirror paramType = variableElement.asType();
        logger.info("field: " + variableElement + ", paramType: " + paramType.toString());

        VariableElementSetBuilder setBuilder = new VariableElementSetBuilder("result", myMethod, setElement, fieldName);

        if (TypeUtil.isInt(paramType)) {
            setBuilder.buildStatement("parser.optInt(jsiObject.get($S))", keyName);
        } else if (TypeUtil.isLong(paramType)) {
            setBuilder.buildStatement("parser.optLong(jsiObject.get($S))", keyName);
        } else if (TypeUtil.isFloat(paramType)) {
            setBuilder.buildStatement("parser.optFloat(jsiObject.get($S))", keyName);
        } else if (TypeUtil.isDouble(paramType)) {
            setBuilder.buildStatement("parser.optDouble(jsiObject.get($S))", keyName);
        } else if (TypeUtil.isBoolean(paramType)) {
            setBuilder.buildStatement("parser.optBoolean(jsiObject.get($S))", keyName);
        } else if (TypeUtil.isString(paramType)) {
            setBuilder.buildStatement("parser.optString(jsiObject.get($S))", keyName);
        } else {
            if (paramType.getKind() == TypeKind.DECLARED) {
                DeclaredType declaredType = (DeclaredType) paramType;
                setBuilder.addStatement("parser.toJavaValue(jsiObject.get($S),", keyName);
                generateVariableElementParams(setBuilder, declaredType);
                setBuilder.endControlFlow().build();
            } else if (paramType instanceof TypeVariable) {
                TypeVariable typeVariable = (TypeVariable) paramType;
                int typeVariableIndex = findTypeArgumentsOfIndex(typeVariable);
                if (typeVariableIndex < 0) {
                    paramType = typeVariable.getUpperBound();
                    setBuilder.buildStatement("parser.toJavaValue(jsiObject.get($S),$T.class)", keyName, paramType);
                } else {
                    setBuilder.buildStatement("parser.toJavaValue(jsiObject.get($S),parser.getArgumentType(type, $L))", keyName, typeVariableIndex);
                }
            } else {
                setBuilder.buildStatement("null");
            }
        }
    }


    private void generateVariableElementParams(VariableElementSetBuilder setBuilder, TypeMirror paramType) {
        if (paramType.getKind() == TypeKind.DECLARED) {
            DeclaredType declaredType = (DeclaredType) paramType;
            List<? extends TypeMirror> argTypes = declaredType.getTypeArguments();
            int size = argTypes.size();
            if (size > 0) {
                setBuilder.addStatement("parser.getParameterizedType(type,$L.class,", declaredType.asElement().toString());
                for (int i = 0; i < size; i++) {
                    if (i > 0) {
                        setBuilder.addStatement(",");
                    }
                    TypeMirror typeT = argTypes.get(i);
                    if (typeT.getKind() == TypeKind.WILDCARD) {
                        WildcardType wildcardType = (WildcardType) typeT;
                        typeT = wildcardType.getExtendsBound();
                    }
                    if (typeT.getKind() == TypeKind.DECLARED) {
                        generateVariableElementParams(setBuilder, typeT);
                    } else if (typeT.getKind() == TypeKind.TYPEVAR) {
                        TypeVariable typeVariable = (TypeVariable) typeT;
                        int typeVariableIndex = findTypeArgumentsOfIndex(typeVariable);
                        setBuilder.addStatement("$L", typeVariableIndex);
                    } else {
                        setBuilder.addStatement("$T.class", typeT);
                    }
                }
                setBuilder.endControlFlow();
            } else {
                setBuilder.addStatement(" $L.class", ((DeclaredType) paramType).asElement().toString());
            }
        } else if (paramType instanceof TypeVariable) {
            TypeVariable typeVariable = (TypeVariable) paramType;
            int typeVariableIndex = findTypeArgumentsOfIndex(typeVariable);
            if (typeVariableIndex < 0) {
                paramType = typeVariable.getUpperBound();
                setBuilder.buildStatement("$T.class", paramType);
            } else {
                setBuilder.buildStatement("parser.getArgumentType(type, $L)", typeVariableIndex);
            }
        } else {
            setBuilder.buildStatement("null");
        }


    }


    private static class VariableElementSetBuilder {

        private String ownerName;
        private MethodSpec.Builder myMethod;
        private ExecutableElement setElement;
        private String fieldName;

        private StringBuffer formatBuffer = new StringBuffer();
        private List<Object> params = new ArrayList<>();

        public VariableElementSetBuilder(String ownerName, MethodSpec.Builder myMethod, ExecutableElement setElement, String fieldName) {
            this.ownerName = ownerName;
            this.myMethod = myMethod;
            this.setElement = setElement;
            this.fieldName = fieldName;
        }


        public VariableElementSetBuilder addStatement(String format, Object... args) {
            formatBuffer.append(format);
            int size = args.length;
            for (int i = 0; i < size; i++) {
                params.add(args[i]);
            }
            return this;
        }

        public VariableElementSetBuilder beginControlFlow() {
            formatBuffer.append("(");
            return this;
        }

        public VariableElementSetBuilder endControlFlow() {
            formatBuffer.append(")");
            return this;
        }

        public void buildStatement(String format, Object... args) {
            addStatement(format, args);
            build();
        }

        public void build() {
            StringBuffer sb = new StringBuffer();
            sb.append(ownerName);
            if (setElement != null) {
                sb.append(".").append(setElement.getSimpleName()).append("(");
                sb.append(formatBuffer.toString());
                sb.append(")");
            } else {
                sb.append(".").append(fieldName).append(" = ");
                sb.append(formatBuffer.toString());
            }

            myMethod.addStatement(sb.toString(), params.toArray());
        }

    }


    private MethodSpec generateToJsiValueMethod() {
        MethodSpec.Builder myMethod = MethodSpec.methodBuilder("toJsiValue").addAnnotation(Override.class).addModifiers(Modifier.PUBLIC).returns(TypeUtil.JsiValue).addParameter(TypeUtil.ValueParser, "parser").addParameter(thisClass, "value");

        myMethod.addStatement("$T result =  null", TypeUtil.JsiObject);
        myMethod.beginControlFlow("if (value instanceof $T)", thisClass);
        myMethod.addStatement("$T param = ($T)value ", thisClass, thisClass);
        myMethod.addStatement("result =  new $T()", TypeUtil.JsiObject);

        List<? extends Element> allMembers = getClassAllElements(classElement);
        for (Element member : allMembers) {
            if (member.getKind() == ElementKind.FIELD) {
                if (isStatic(member)){
                    continue;
                }
                HMJsiName annotation = member.getAnnotation(HMJsiName.class);
                String fieldName = member.getSimpleName().toString();
                String annotationName = "";
                String keyName = fieldName;
                String getFuncName = "get" + upperCase(fieldName);
                VariableElement variableElement = (VariableElement) member;
                if (annotation != null) {
                    annotationName = annotation.value();
                    if (annotationName != null && annotationName.length() > 0) {
                        keyName = annotationName;
                    }
                }

                logger.info("field: " + variableElement + ", annotation: " + annotationName);
                // set方法
                member.getClass();
                ExecutableElement getElement = pickMethod(allMembers, getFuncName);

                if (getElement != null) {
                    myMethod.addStatement("result.put($S,parser.toJsiValue(param.$L()))", keyName, getFuncName);
                } else {
                    myMethod.addStatement("result.put($S,parser.toJsiValue(param.$L))", keyName, fieldName);
                }
            }
        }

        myMethod.endControlFlow().addStatement("return result");
        return myMethod.build();
    }


    private boolean isStatic(Element element) {
        return element.getModifiers().contains(Modifier.STATIC);
    }
    /**
     * 首字母大写
     *
     * @param str
     * @return
     */
    private String upperCase(String str) {
        char[] ch = str.toCharArray();
        if (ch[0] >= 'a' && ch[0] <= 'z') {
            ch[0] = (char) (ch[0] - 32);
        }
        return new String(ch);
    }

    /**
     * 判断目标类的父类是否是指定的类
     *
     * @param className 指定类
     * @return
     */
    private boolean isSuperClass(ClassName className) {
        TypeElement parent = classElement;
        do {
            parent = TypeUtil.getSuperClass(parent);
        } while (parent != null && !parent.toString().startsWith(className.toString()));
        return parent != null;
    }

    /**
     * 在所有成员方法中找到对应方法名的方法
     *
     * @param allMembers
     * @param funcName
     * @return
     */
    private ExecutableElement pickMethod(List<? extends Element> allMembers, String funcName) {
        for (Element member : allMembers) {
            if (member.getKind() == ElementKind.METHOD && member.getSimpleName().toString().equals(funcName)) {
                return (ExecutableElement) member;
            }
        }
        return null;
    }

    /**
     * 判断某个方法或者属性是否是static
     *
     * @param element
     * @return
     */
    private boolean isStaticModifier(Element element) {
        return element.getModifiers().contains(Modifier.STATIC);
    }

    /**
     * 获取class的所有成员方法和成员变量
     *
     * @param typeElement
     * @return
     */
    private List<? extends Element> getClassAllElements(TypeElement typeElement) {
        List<String> allMemberNames = new ArrayList<>(); // 用于去重
        List<Element> allMembers = new ArrayList<>();
        TypeElement parent = typeElement;
        while (parent != null && !parent.toString().startsWith(TypeUtil.ObjectClass)) {
            // 获取class的所有成员方法和成员变量（包括父类）
            // List<? extends Element> members = elementUtils.getAllMembers(parent);
            // 获取class的所有成员方法和成员变量（不包括父类）
            List<? extends Element> members = parent.getEnclosedElements();
            for (Element e : members) {
                if (!allMemberNames.contains(e.toString())) {
                    allMemberNames.add(e.toString());
                    allMembers.add(e);
                }
            }
            parent = TypeUtil.getSuperClass(parent);
        }
        return allMembers;
    }
}
