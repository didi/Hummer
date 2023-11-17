package com.didi.hummer.compiler;

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
@SupportedAnnotationTypes("com.didi.hummer.annotation.Component")
public class HummerExportProcessor extends AbstractProcessor {
    private ProcessingEnvironment processingEnv;
    private ComponentInvokerClassCreator componentInvokerClassCreator;
    private HummerRegisterClassCreator classDefinitionRegisterClassCreator;

    @Override
    public synchronized void init(ProcessingEnvironment processingEnvironment) {
        super.init(processingEnvironment);
        processingEnv = processingEnvironment;
        componentInvokerClassCreator = new ComponentInvokerClassCreator(processingEnv);
        classDefinitionRegisterClassCreator = new HummerRegisterClassCreator(processingEnv);
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (TypeElement typeElement : annotations) {
            Set<? extends Element> classElements = roundEnv.getElementsAnnotatedWith(typeElement);
            for (Element element : classElements) {
                if (element.getKind() == ElementKind.CLASS) {
                    TypeElement classElement = (TypeElement) element;

                    componentInvokerClassCreator.processClass(classElement).create();
                    classDefinitionRegisterClassCreator.processClass(classElement);
                }
            }
            classDefinitionRegisterClassCreator.create();
            classDefinitionRegisterClassCreator.createModuleConfigFile();
        }
        return false;
    }
}
