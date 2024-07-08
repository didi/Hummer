package com.didi.hummer2.compiler;

/**
 * Created by XiaoFeng on 2019-10-11.
 */
public class Constant {

    public static final String KEY_MODULE_NAME = "HUMMER_MODULE_NAME";

    public static final String NO_MODULE_NAME_TIPS = "\nThese is no module name at 'build.gradle', like :\n" +
            "android {\n" +
            "    defaultConfig {\n" +
            "        ...\n" +
            "        javaCompileOptions {\n" +
            "            annotationProcessorOptions {\n" +
            "                arguments = [HUMMER_MODULE_NAME: project.getName()]\n" +
            "            }\n" +
            "        }\n" +
            "    }\n" +
            "}\n";

    public static final String PACKAGE_NAME = "com.didi.hummer2.register";
    public static final String SEPARATOR = "$$";
    public static final String NAME_OF_REGISTER = "HummerRegister";
    public static final String NAME_OF_INVOKER = "Invoker";

    public static final String NAME_OF_ADAPTER_REGISTER = "JsiValueAdapterRegister";
    public static final String NAME_OF_ADAPTER = "JsiValueAdapter";

    public static final String PREFIX_OF_REGISTER_FILE = NAME_OF_REGISTER + SEPARATOR;

    public static final String SUFFIX_OF_INVOKER_FILE = SEPARATOR + NAME_OF_INVOKER;

    public static final String PREFIX_OF_ADAPTER_REGISTER_FILE = NAME_OF_ADAPTER_REGISTER + SEPARATOR;
    public static final String SUFFIX_OF_ADAPTER_FILE = SEPARATOR + NAME_OF_ADAPTER;
}
