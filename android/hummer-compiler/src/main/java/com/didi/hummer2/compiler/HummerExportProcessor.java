package com.didi.hummer2.compiler;

import java.util.Set;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.annotation.processing.SupportedSourceVersion;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.TypeElement;

@SupportedSourceVersion(SourceVersion.RELEASE_8)
@SupportedAnnotationTypes("com.didi.hummer2.annotation.HMComponent")
public class HummerExportProcessor extends AbstractProcessor {
    private ProcessingEnvironment processingEnv;
    private HummerInvokerClassCreator hummerInvokerClassCreator;
    private HummerRegisterClassCreator hummerRegisterClassCreator;

    @Override
    public synchronized void init(ProcessingEnvironment processingEnvironment) {
        super.init(processingEnvironment);
        processingEnv = processingEnvironment;
        hummerInvokerClassCreator = new HummerInvokerClassCreator(processingEnv);
        hummerRegisterClassCreator = new HummerRegisterClassCreator(processingEnv);
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (TypeElement typeElement : annotations) {
            Set<? extends Element> classElements = roundEnv.getElementsAnnotatedWith(typeElement);
            for (Element element : classElements) {
                if (element.getKind() == ElementKind.CLASS) {
                    TypeElement classElement = (TypeElement) element;

                    hummerInvokerClassCreator.processClass(classElement).create();
                    hummerRegisterClassCreator.processClass(classElement);
                }
            }
            hummerRegisterClassCreator.create();
            hummerRegisterClassCreator.createModuleConfigFile();
        }
        return false;
    }
}
