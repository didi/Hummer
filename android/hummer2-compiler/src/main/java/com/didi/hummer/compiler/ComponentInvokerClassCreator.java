package com.didi.hummer.compiler;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
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
import javax.lang.model.type.TypeMirror;
import javax.lang.model.type.TypeVariable;
import javax.lang.model.util.Elements;
import javax.lang.model.util.Types;

/**
 * Created by XiaoFeng on 2019-09-18.
 */
public class ComponentInvokerClassCreator {
    private Elements elementUtils;
    private Types typeUtils;
    private Filer filer;
    private Logger logger;
    private TypeElement classElement;
    private String packageName;
    private String className;
    private String annoClassName;
    private ClassName thisClass;
    private TypeName baseInvokerTHmBase;

    public ComponentInvokerClassCreator(ProcessingEnvironment processingEnv) {
        elementUtils = processingEnv.getElementUtils();
        typeUtils = processingEnv.getTypeUtils();
        filer = processingEnv.getFiler();
        logger = new Logger(processingEnv.getMessager());
    }

    public ComponentInvokerClassCreator processClass(TypeElement classElement) {
        logger.info("Class: " + classElement.getQualifiedName() + " extends " + classElement.getSuperclass());
        this.classElement = classElement;
        packageName = elementUtils.getPackageOf(classElement).getQualifiedName().toString();
        className = classElement.getSimpleName().toString();
        annoClassName = classElement.getAnnotation(Component.class).value();
        thisClass = ClassName.get(packageName, className);
        baseInvokerTHmBase = ParameterizedTypeName.get(TypeUtil.baseInvoker, thisClass); // 泛型
        return this;
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
        return TypeSpec.classBuilder(annoClassName + Constant.SUFFIX_OF_INVOKER_FILE)
                // public 修饰类
                .addModifiers(Modifier.PUBLIC)
                // 父类
                .superclass(baseInvokerTHmBase)
                // 添加类的方法
                .addMethod(generateGetNameMethod())
                // 添加类的方法
                .addMethod(generateCreateInstanceMethod())
                // 添加类的方法
                .addMethod(generateInvokeMethod())
                // 构建Java类
                .build();
    }

    private MethodSpec generateGetNameMethod() {
        return MethodSpec.methodBuilder("getName")
                .addAnnotation(Override.class)
                .addModifiers(Modifier.PUBLIC)
                .returns(String.class)
                .addStatement("return $S", annoClassName)
                .build();
    }

    private MethodSpec generateCreateInstanceMethod() {
        MethodSpec.Builder createInstanceMethod = MethodSpec.methodBuilder("createInstance")
                .addAnnotation(Override.class)
                .addModifiers(Modifier.PROTECTED)
                .returns(thisClass)
                .addParameter(TypeUtil.jsValue, "jsValue")
                .addParameter(Object[].class, "params");

        ExecutableElement constructor = TypeUtil.getConstructor(classElement);
        List<? extends VariableElement> methodParameters = constructor.getParameters();

        // 如果导出类继承至HMBase类
        if (isSuperClass(TypeUtil.hmBase)) {
            // 先去掉前两个默认参数
            if (methodParameters.size() >= 2) {
                methodParameters = methodParameters.subList(2, methodParameters.size());
            }
            // 生成需调用函数的参数
            String lastParams = generateEachFunctionParams(createInstanceMethod, methodParameters);
            if (lastParams.length() > 0) {
                createInstanceMethod.addStatement("return new $T(mHummerContext, jsValue, $L)", classElement, lastParams);
            } else {
                createInstanceMethod.addStatement("return new $T(mHummerContext, jsValue)", classElement);
            }
        } else if (methodParameters.size() > 0) {
            // 处理前两个特殊参数类型
            StringBuilder firstParams = new StringBuilder();
            int defaultParamCount = 0;
            String param0Type = methodParameters.get(0).asType().toString();
            if (TypeUtil.jsValue.toString().equals(param0Type) || TypeUtil.hummerContext.toString().equals(param0Type) || TypeUtil.context.toString().equals(param0Type)) {
                defaultParamCount = 1;
                if (TypeUtil.jsValue.toString().equals(param0Type)) {
                    // 如果导出类的构造函数参数是JSValue型，默认接收jsValue
                    firstParams.append("jsValue");
                } else if (TypeUtil.hummerContext.toString().equals(param0Type)) {
                    // 如果导出类的构造函数参数是HummerContext型，默认接收HummerContext
                    firstParams.append("mHummerContext");
                } else if (TypeUtil.context.toString().equals(param0Type)) {
                    // 如果导出类的构造函数参数是Context型，默认接收Context
                    firstParams.append("mHummerContext.getContext()");
                }

                if (methodParameters.size() > 1) {
                    String param1Type = methodParameters.get(1).asType().toString();
                    if (TypeUtil.jsValue.toString().equals(param1Type)) {
                        defaultParamCount = 2;
                        firstParams.append(", jsValue");
                    } else if (TypeUtil.hummerContext.toString().equals(param1Type)) {
                        defaultParamCount = 2;
                        firstParams.append(", mHummerContext");
                    } else if (TypeUtil.context.toString().equals(param1Type)) {
                        defaultParamCount = 2;
                        firstParams.append(", mHummerContext.getContext()");
                    }
                }
            }

            // 去掉前一个或两个默认参数
            methodParameters = methodParameters.subList(defaultParamCount, methodParameters.size());
            // 生成需调用函数的参数
            String lastParams = generateEachFunctionParams(createInstanceMethod, methodParameters);

            if (lastParams.length() > 0 && firstParams.length() > 0) {
                createInstanceMethod.addStatement("return new $T($L, $L)", classElement, firstParams, lastParams);
            } else if (firstParams.length() > 0) {
                createInstanceMethod.addStatement("return new $T($L)", classElement, firstParams);
            } else if (lastParams.length() > 0) {
                createInstanceMethod.addStatement("return new $T($L)", classElement, lastParams);
            } else {
                createInstanceMethod.addStatement("return new $T()", classElement);
            }
        } else {
            // 生成需调用函数的参数
            String params = generateEachFunctionParams(createInstanceMethod, methodParameters);
            createInstanceMethod.addStatement("return new $T($L)", classElement, params);
        }

        return createInstanceMethod.build();
    }

    private MethodSpec generateInvokeMethod() {
        MethodSpec.Builder invokeMethod = MethodSpec.methodBuilder("invoke")
                .addAnnotation(Override.class)
                .addModifiers(Modifier.PROTECTED)
                .returns(Object.class)
                .addParameter(thisClass, "instance")
                .addParameter(String.class, "methodName")
                .addParameter(Object[].class, "params");

        invokeMethod
                .addStatement("$T jsRet = null", Object.class)
                .beginControlFlow("switch ($L)", "methodName");

        List<? extends Element> allMembers = getClassAllElements(classElement);
        for (Element member : allMembers) {
            if (member.getKind() == ElementKind.METHOD) {
                JsMethod jsMethod = member.getAnnotation(JsMethod.class);
                if (jsMethod != null) {
                    ExecutableElement executableElement = (ExecutableElement) member;
                    logger.info("Method: " + executableElement.getModifiers() + executableElement);
                    generateEachFunctionCase(invokeMethod, executableElement);
                }
            } else if (member.getKind() == ElementKind.FIELD) {
                JsProperty jsProperty = member.getAnnotation(JsProperty.class);
                if (jsProperty != null) {
                    String annoValue = jsProperty.value();
                    String setFuncName = "set" + upperCase(annoValue);
                    String getFuncName = "get" + upperCase(annoValue);

                    VariableElement variableElement = (VariableElement) member;
                    logger.info("Variable: " + variableElement + ", anno: " + annoValue);

                    // set方法
                    ExecutableElement setElement = pickMethod(allMembers, setFuncName);
                    if (setElement != null) {
                        generateEachFunctionCase(invokeMethod, setElement);
                    } else {
                        generateEachVariableSetCase(invokeMethod, variableElement, setFuncName);
                    }

                    // get方法
                    ExecutableElement getElement = pickMethod(allMembers, getFuncName);
                    if (getElement != null) {
                        generateEachFunctionCase(invokeMethod, getElement);
                    }
                }
            }
        }

        invokeMethod
                .endControlFlow()
                .addStatement("return jsRet");
        return invokeMethod.build();
    }

    /**
     * 自动生成 【变量】对应的get/set方法的 switch...case...语句
     *
     * @param methodSpec
     * @param executableElement
     */
    private void generateEachFunctionCase(MethodSpec.Builder methodSpec, ExecutableElement executableElement) {
        String funcName = executableElement.getSimpleName().toString();
        methodSpec.beginControlFlow("case $S:", funcName);

        String params = generateEachFunctionParams(methodSpec, executableElement.getParameters());

        // 返回类型
        String returnType = executableElement.getReturnType().toString();
        boolean isStaticMethod = isStaticModifier(executableElement);
        String instance = isStaticMethod ? className : "instance";
        if (TypeUtil.isVoid(returnType)) {
            methodSpec.addStatement("$L.$L($L)", instance, funcName, params);
        } else if (TypeUtil.hmBase.toString().equals(returnType)) {
            methodSpec.addStatement("jsRet = $L.$L($L).getJSValue()", instance, funcName, params);
        } else {
            methodSpec.addStatement("jsRet = $L.$L($L)", instance, funcName, params);
        }
        methodSpec.endControlFlow("break");
    }

    /**
     * 生成需调用函数的参数
     *
     * @param methodSpec
     * @param methodParameters
     * @return
     */
    private String generateEachFunctionParams(MethodSpec.Builder methodSpec, List<? extends VariableElement> methodParameters) {
        StringBuilder params = new StringBuilder();

        // 处理第一个参数是HummerContext或Context类型的情况
        if (methodParameters.size() > 0) {
            String param0Type = methodParameters.get(0).asType().toString();
            if (TypeUtil.hummerContext.toString().equals(param0Type)) {
                params.append("mHummerContext,");
                methodParameters = methodParameters.subList(1, methodParameters.size());
            } else if (TypeUtil.context.toString().equals(param0Type)) {
                params.append("mHummerContext.getContext(),");
                methodParameters = methodParameters.subList(1, methodParameters.size());
            }
        }

        // 处理普通参数类型
        int index = 0;
        for (VariableElement variableElement : methodParameters) {
            processSingleStatement(methodSpec, variableElement, index);
            params.append("param").append(index).append(",");
            index++;
        }
        if (params.length() > 0) {
            params.deleteCharAt(params.length() - 1);
        }
        return params.toString();
    }

    /**
     * 自动生成【变量】set 的 switch...case...语句
     *
     * @param methodSpec
     * @param variableElement
     */
    private void generateEachVariableSetCase(MethodSpec.Builder methodSpec, VariableElement variableElement, String setFuncName) {
        methodSpec.beginControlFlow("case $S:", setFuncName);
        processSingleStatement(methodSpec, variableElement, 0);
        String varName = variableElement.getSimpleName().toString();
        methodSpec.addStatement("instance.$L = param0", varName);
        methodSpec.endControlFlow("break");
    }

    private void processSingleStatement(MethodSpec.Builder methodSpec, VariableElement variableElement, int index) {
        TypeMirror paramType = variableElement.asType();
        if (paramType instanceof TypeVariable) {
            paramType = ((TypeVariable) paramType).getUpperBound();
        }
        //参数类型
        String paramKind = paramType.toString();
        if (TypeUtil.isNumber(paramKind)) {
            methodSpec.addStatement("$T param$L = params.length > $L && params[$L] != null ? (($T) params[$L]).$L : 0", paramType, index, index, index, Number.class, index, TypeUtil.getNumberToMethodName(paramKind));
        } else if (TypeUtil.isBoolean(paramKind)) {
            methodSpec.addStatement("$T param$L = params.length > $L && params[$L] != null ? ($T) params[$L] : false", paramType, index, index, index, paramType, index);
        } else if (TypeUtil.isString(paramKind)) {
            methodSpec.addStatement("$T param$L = params.length > $L && params[$L] != null ? $T.valueOf(params[$L]) : null", paramType, index, index, index, paramType, index);
        } else if (TypeUtil.isCollectionType(paramKind)) {
            methodSpec.addStatement("$T param$L = params.length > $L && params[$L] != null ? $T.fromJson((String) params[$L], new $T<$T>(){}.getType()) : null", paramType, index, index, index, TypeUtil.hmGsonUtil, index, TypeUtil.typeToken, paramType);
        } else if (TypeUtil.jsValue.toString().equals(paramKind)
                || TypeUtil.jsCallback.toString().equals(paramKind)) {
            methodSpec.addStatement("$T param$L = params.length > $L && params[$L] != null ? ($T) params[$L] : null", paramType, index, index, index, paramType, index);
        } else if (TypeUtil.hmBase.toString().equals(paramKind)) {
            methodSpec.addStatement("$T childId$L = params.length > $L && params[$L] != null ? (($T) params[$L]).longValue() : 0", long.class, index, index, index, Number.class, index);
            methodSpec.addStatement("$T param$L = mInstanceManager.get(childId$L)", paramType, index, index);
        } else {
            methodSpec.addStatement("$T param$L = params.length > $L ? ((params[$L] instanceof String && ($T.isJsonObject((String) params[$L]) || $T.isJsonArray((String) params[$L]))) ? $T.fromJson((String) params[$L], new $T<$T>(){}.getType()) : ($T) params[$L]) : null", paramType, index, index, index, TypeUtil.hmGsonUtil, index, TypeUtil.hmGsonUtil, index, TypeUtil.hmGsonUtil, index, TypeUtil.typeToken, paramType, paramType, index);
        }
    }

    /**
     * 自动生成【变量】get 的 switch...case...语句
     *
     * @param methodSpec
     * @param variableElement
     */
    private void generateEachVariableGetCase(MethodSpec.Builder methodSpec, VariableElement variableElement) {
        String varName = variableElement.getSimpleName().toString();
        methodSpec.beginControlFlow("case $S:", varName);
        methodSpec.addStatement("return instance.$L", varName);
        methodSpec.endControlFlow("break");
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
        while (parent != null && !parent.toString().startsWith(TypeUtil.hmBase.toString())) {
            // 获取class的所有成员方法和成员变量（包括父类）
//            List<? extends Element> members = elementUtils.getAllMembers(parent);
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
