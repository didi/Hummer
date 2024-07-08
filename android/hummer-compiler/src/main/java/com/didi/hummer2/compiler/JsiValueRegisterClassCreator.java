package com.didi.hummer2.compiler;

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
 * @Description JsiValue模型转换Adapter注册代码生成
 */
public class JsiValueRegisterClassCreator {
    private Elements elementUtils;
    private Types typeUtils;
    private Filer filer;
    private Logger logger;
    private String moduleName;
    private StringBuilder jsCode = new StringBuilder();
    private List<ClassName> adapterClassMap = new ArrayList<>();

    //JsiValueAdapterRegister
    private ClassName superInterface = ClassName.get("com.didi.hummer2.bridge.convert", "JsiValueAdapterRegister");
    private ClassName jsiValueRegister = ClassName.get("com.didi.hummer2.bridge.convert", "JsiValueRegister");


    public JsiValueRegisterClassCreator(ProcessingEnvironment processingEnv) {
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

    public JsiValueRegisterClassCreator processClass(TypeElement classElement) {
        logger.info("[adapter] Class: " + classElement.getQualifiedName() + " extends " + classElement.getSuperclass());
        String packageName = elementUtils.getPackageOf(classElement).getQualifiedName().toString();
        String adapterClassName = classElement.getSimpleName().toString();
        adapterClassMap.add(ClassName.get(packageName, adapterClassName + Constant.SUFFIX_OF_ADAPTER_FILE));
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

    /**
     * 构建META-INF文件用于自动加载接口实现
     */
    public void createModuleConfigFile() {
        String value = Constant.PACKAGE_NAME + "." + Constant.PREFIX_OF_ADAPTER_REGISTER_FILE + moduleName;
        String resourceFile = "META-INF/services/com.didi.hummer2.bridge.convert.JsiValueAdapterRegister";
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
        return TypeSpec.classBuilder(Constant.PREFIX_OF_ADAPTER_REGISTER_FILE + moduleName)
                // public 修饰类
                .addModifiers(Modifier.PUBLIC)
                //指定实现接口
                .addSuperinterface(superInterface)
                // 添加类的方法
                .addMethod(generateStaticRegisterMethod()).addMethod(generateRegisterMethod())
                // 构建Java类
                .build();
    }


    private MethodSpec generateStaticRegisterMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("registerX").addModifiers(Modifier.PUBLIC, Modifier.STATIC).addParameter(jsiValueRegister, "invokerRegister");
        for (ClassName className : adapterClassMap) {
            method.addStatement("invokerRegister.register(new $T())", className);
        }
        return method.build();
    }

    private MethodSpec generateRegisterMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("register").addModifiers(Modifier.PUBLIC).addAnnotation(Override.class).addParameter(jsiValueRegister, "invokerRegister");
        for (ClassName className : adapterClassMap) {
            method.addStatement("invokerRegister.register(new $T())", className);
        }
        return method.build();
    }

}
