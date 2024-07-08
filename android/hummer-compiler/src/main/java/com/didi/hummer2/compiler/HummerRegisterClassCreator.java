package com.didi.hummer2.compiler;

import com.didi.hummer2.annotation.HMComponent;
import com.squareup.javapoet.ClassName;
import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.MethodSpec;
import com.squareup.javapoet.TypeSpec;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import javax.annotation.processing.Filer;
import javax.annotation.processing.ProcessingEnvironment;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.util.Elements;
import javax.lang.model.util.Types;
import javax.tools.FileObject;
import javax.tools.StandardLocation;

/**
 * didi Create on 2024/7/4 .
 * <p>
 * Copyright (c) 2024/7/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/4 8:16 PM
 * @Description Hummer导出组件自动注册代码生成
 */
public class HummerRegisterClassCreator {
    private Elements elementUtils;
    private Types typeUtils;
    private Filer filer;
    private Logger logger;
    private String moduleName;
    private List<ClassName> invokerClassMap = new ArrayList<>();

    //HummerRegister
    private ClassName superInterface = ClassName.get("com.didi.hummer2.register", "HummerRegister");
    private ClassName invokerRegister = ClassName.get("com.didi.hummer2.register", "InvokerRegister");

    public HummerRegisterClassCreator(ProcessingEnvironment processingEnv) {
        elementUtils = processingEnv.getElementUtils();
        typeUtils = processingEnv.getTypeUtils();
        filer = processingEnv.getFiler();
        logger = new Logger(processingEnv.getMessager());

        // Attempt to get user configuration [moduleName]
        Map<String, String> options = processingEnv.getOptions();
        if (options != null && !options.isEmpty()) {
            moduleName = options.get(Constant.KEY_MODULE_NAME);
        }

        if (moduleName != null && !moduleName.isEmpty()) {
            moduleName = moduleName.replaceAll("[^0-9a-zA-Z_]+", "_");

            logger.info("The user has configuration the module name, it was [" + moduleName + "]");
        } else {
            logger.error(Constant.NO_MODULE_NAME_TIPS);
            throw new RuntimeException("ARouter::Compiler >>> No module name, for more information, look at gradle log.");
        }
    }

    public HummerRegisterClassCreator processClass(TypeElement classElement) {
        logger.info("[JS] Class: " + classElement.getQualifiedName() + " extends " + classElement.getSuperclass());
        String packageName = elementUtils.getPackageOf(classElement).getQualifiedName().toString();
        String annoClassName = classElement.getAnnotation(HMComponent.class).value();
        invokerClassMap.add(ClassName.get(packageName, annoClassName + "$$Invoker"));
        return this;
    }

    public void create() {
        JavaFile javaFile = JavaFile.builder(Constant.PACKAGE_NAME, generateJavaClass()).build();
        try {
            javaFile.writeTo(filer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void createModuleConfigFile() {
        String value = Constant.PACKAGE_NAME + "." + Constant.PREFIX_OF_REGISTER_FILE + moduleName;
        String resourceFile = "META-INF/services/com.didi.hummer2.register.HummerRegister";
        SortedSet<String> newServices = new TreeSet<>();
        newServices.add(value);
        try {
            SortedSet<String> allServices = new TreeSet<>();
            try {
                FileObject existingFile = filer.getResource(StandardLocation.CLASS_OUTPUT, "", resourceFile);
                logger.info("Looking for existing resource file at " + existingFile.toUri());
                Set<String> oldServices = ServiceFiles.readServiceFile(existingFile.openInputStream());
                logger.info("Existing service entries: " + oldServices);
                allServices.addAll(oldServices);
            } catch (IOException e) {
                logger.info("Resource file did not already exist.");
            }

            allServices.addAll(newServices);
            logger.info("New service file contents: " + allServices);
            FileObject fileObject = filer.createResource(StandardLocation.CLASS_OUTPUT, "", resourceFile);
            try (OutputStream out = fileObject.openOutputStream()) {
                ServiceFiles.writeServiceFile(allServices, out);
            }
            logger.info("Wrote to: " + fileObject.toUri());
        } catch (IOException e) {
            e.printStackTrace();
        }
        logger.info("createModuleConfigFile");
    }

    private TypeSpec generateJavaClass() {
        return TypeSpec.classBuilder(Constant.PREFIX_OF_REGISTER_FILE + moduleName)
                // public 修饰类
                .addModifiers(Modifier.PUBLIC)
                //指定实现接口
                .addSuperinterface(superInterface)
                // 添加类的方法
                .addMethod(generateInitMethod())
                .addMethod(generateRegisterMethod())
                // 构建Java类
                .build();
    }

    private MethodSpec generateInitMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("register").addModifiers(Modifier.PUBLIC, Modifier.STATIC).addParameter(TypeUtil.hummerContext, "hummerContext");
        for (ClassName className : invokerClassMap) {
            method.addStatement("hummerContext.registerInvoker(new $T())", className);
        }
        return method.build();
    }

    private MethodSpec generateRegisterMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("register").addModifiers(Modifier.PUBLIC).addAnnotation(Override.class).addParameter(invokerRegister, "invokerRegister");
        for (ClassName className : invokerClassMap) {
            method.addStatement("invokerRegister.registerInvoker(new $T())", className);
        }
        return method.build();
    }

}
