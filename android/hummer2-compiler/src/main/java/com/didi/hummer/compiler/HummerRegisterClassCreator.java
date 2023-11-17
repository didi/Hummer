package com.didi.hummer.compiler;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;
import com.didi.hummer.annotation.JsProperty;
import com.squareup.javapoet.ClassName;
import com.squareup.javapoet.FieldSpec;
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
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.element.VariableElement;
import javax.lang.model.util.Elements;
import javax.lang.model.util.Types;
import javax.tools.FileObject;
import javax.tools.StandardLocation;

/**
 * Created by XiaoFeng on 2019-09-18.
 */
public class HummerRegisterClassCreator {
    private Elements elementUtils;
    private Types typeUtils;
    private Filer filer;
    private Logger logger;
    private String moduleName;
    private StringBuilder jsCode = new StringBuilder();
    private List<ClassName> invokerClassMap = new ArrayList<>();

    private ClassName superInterface = ClassName.get("com.didi.hummer.context", "HummerModuleRegister");

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
        String annoClassName = classElement.getAnnotation(Component.class).value();
        invokerClassMap.add(ClassName.get(packageName, annoClassName + "$$Invoker"));

        // 这里改成var View = class View extents Base {} 的形式，是为了可以让使用者覆盖这个class
        jsCode.append("var ").append(annoClassName).append(" = ").append("class ").append(annoClassName).append(" extends Base {").append("\n");
        jsCode.append("    constructor(...args) {").append("\n");
        jsCode.append("        super('").append(annoClassName).append("', ...args);").append("\n");
        jsCode.append("    }").append("\n");

        List<? extends Element> allMembers = getClassAllElements(classElement);
        for (Element member : allMembers) {
            if (member.getKind() == ElementKind.METHOD) {
                JsMethod jsMethod = member.getAnnotation(JsMethod.class);
                if (jsMethod != null) {
                    String annoValue = jsMethod.value();
                    if (annoValue.isEmpty()) {
                        continue;
                    }

                    ExecutableElement executableElement = (ExecutableElement) member;
                    String funcName = executableElement.getSimpleName().toString();
                    logger.info("[JS] Method: " + executableElement.getModifiers() + executableElement);

                    String objID;
                    if (isStaticModifier(executableElement)) {
                        jsCode.append("    static ");
                        objID = "0";
                    } else {
                        jsCode.append("    ");
                        objID = "this.objID";
                    }
                    jsCode.append(annoValue).append("(...args) {").append("\n");
                    // 这里使用stash变量暂存一下args，是为了让args的生命周期延长至整个方法体执行结束之后，不要提前释放
                    jsCode.append("        let stash = args;").append("\n");
                    jsCode.append("        args = transArgs(...args);").append("\n");

                    String returnType = executableElement.getReturnType().toString();
                    if (TypeUtil.isVoid(returnType)) {
                        jsCode.append("        ");
                    } else {
                        jsCode.append("        return ");
                    }

                    jsCode.append("invoke('").append(annoClassName).append("', ").append(objID).append(", '").append(funcName).append("', ...args);").append("\n");
                    jsCode.append("    }").append("\n");
                }
            } else if (member.getKind() == ElementKind.FIELD) {
                JsProperty jsProperty = member.getAnnotation(JsProperty.class);
                if (jsProperty != null) {
                    String annoValue = jsProperty.value();
                    String setFuncName = "set" + upperCase(annoValue);
                    String getFuncName = "get" + upperCase(annoValue);

                    VariableElement variableElement = (VariableElement) member;
                    logger.info("[JS] Variable: " + variableElement + ", anno: " + annoValue);

                    // set方法
                    String objID;
                    if (isStaticModifier(variableElement)) {
                        jsCode.append("    static set ");
                        objID = "0";
                    } else {
                        jsCode.append("    set ");
                        objID = "this.objID";
                    }
                    jsCode.append(annoValue).append("(arg) {").append("\n");
                    jsCode.append("        this._").append(annoValue).append(" = arg;").append("\n");
                    jsCode.append("        arg = transSingleArg(arg);").append("\n");
                    jsCode.append("        invoke('").append(annoClassName).append("', ").append(objID).append(", '").append(setFuncName).append("', arg);").append("\n");
                    jsCode.append("    }").append("\n");

                    // get方法
                    if (isStaticModifier(variableElement)) {
                        jsCode.append("    static get ");
                        objID = "0";
                    } else {
                        jsCode.append("    get ");
                        objID = "this.objID";
                    }
                    jsCode.append(annoValue).append("() {").append("\n");
                    ExecutableElement getElement = pickFunction(allMembers, getFuncName);
                    if (getElement != null) {
                        jsCode.append("        return invoke('").append(annoClassName).append("', ").append(objID).append(", '").append(getFuncName).append("');").append("\n");
                    } else {
                        jsCode.append("        return this._").append(annoValue).append(";").append("\n");
                    }
                    jsCode.append("    }").append("\n");
                }
            }
        }
        jsCode.append("}").append("\n");
        jsCode.append("__GLOBAL__.").append(annoClassName).append(" = ").append(annoClassName).append(";").append("\n");

        return this;
    }

    private String upperCase(String str) {
        char[] ch = str.toCharArray();
        if (ch[0] >= 'a' && ch[0] <= 'z') {
            ch[0] = (char) (ch[0] - 32);
        }
        return new String(ch);
    }

    private ExecutableElement pickFunction(List<? extends Element> allMembers, String funcName) {
        for (Element member : allMembers) {
            if (member.getKind() == ElementKind.METHOD && member.getSimpleName().toString().equals(funcName)) {
                return (ExecutableElement) member;
            }
        }
        return null;
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
        String resourceFile = "META-INF/services/com.didi.hummer.context.HummerModuleRegister";
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
                // 添加类的变量
                .addField(generateJsCodeField())
                // 添加类的方法
                .addMethod(generateInitMethod())
                .addMethod(generateGetModuleNameMethod())
                .addMethod(generateRegisterMethod())
                // 构建Java类
                .build();
    }

    private FieldSpec generateJsCodeField() {
        FieldSpec.Builder field = FieldSpec.builder(String.class, "JS_CODE", Modifier.PUBLIC, Modifier.STATIC, Modifier.FINAL);
        field.initializer("$S", jsCode);
        return field.build();
    }

    private MethodSpec generateInitMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("init")
                .addModifiers(Modifier.PUBLIC, Modifier.STATIC)
                .addParameter(TypeUtil.hummerContext, "hummerContext");
        for (ClassName className : invokerClassMap) {
            method.addStatement("hummerContext.registerInvoker(new $T())", className);
        }
        method.addStatement("hummerContext.evaluateJavaScript(JS_CODE, $S)", moduleName + ".js");
        return method.build();
    }

    private MethodSpec generateRegisterMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("register")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addParameter(TypeUtil.hummerContext, "hummerContext");
        for (ClassName className : invokerClassMap) {
            method.addStatement("hummerContext.registerInvoker(new $T())", className);
        }
        method.addStatement("hummerContext.evaluateJavaScript(JS_CODE, $S)", moduleName + ".js");
        return method.build();
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

    private MethodSpec generateGetModuleNameMethod() {
        MethodSpec.Builder method = MethodSpec.methodBuilder("getModuleName")
                .addModifiers(Modifier.PUBLIC)
                .addAnnotation(Override.class)
                .addStatement("return $S", Constant.PACKAGE_NAME + "." + Constant.PREFIX_OF_REGISTER_FILE + moduleName)
                .returns(String.class);
        return method.build();
    }

}
