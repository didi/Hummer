package com.didi.hummer2.compiler;

import com.didi.hummer2.annotation.HMJsiValue;

import java.lang.annotation.Annotation;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.TypeElement;

/**
 * didi Create on 2024/7/4 .
 * <p>
 * Copyright (c) 2024/7/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/4 7:55 PM
 * @Description 用一句话说明文件功能
 */

public class TestAdapterProcessor extends AbstractProcessor {


    private JsiValueAdapterClassCreator jsiValueAdapterClassCreator;

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv) {
        super.init(processingEnv);
        jsiValueAdapterClassCreator = new JsiValueAdapterClassCreator(processingEnv);
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        // 处理逻辑
        for (TypeElement typeElement : annotations) {
            Set<? extends Element> classElements = roundEnv.getElementsAnnotatedWith(typeElement);
            for (Element element : classElements) {
                if (element.getKind() == ElementKind.CLASS) {
                    TypeElement classElement = (TypeElement) element;
                    Annotation annotation = classElement.getAnnotation(HMJsiValue.class);
                    if (annotation != null) {
                        jsiValueAdapterClassCreator.processClass(classElement).create();
                    }
                }
            }
        }
        return false;
    }

    @Override
    public Set<String> getSupportedAnnotationTypes() {
        Set<String> strings = new HashSet<>();
        strings.add("*");
        return strings;
    }

    @Override
    public SourceVersion getSupportedSourceVersion() {
        return SourceVersion.latestSupported();
    }
}
