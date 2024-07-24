package com.didi.hummer2.compiler;

import static org.junit.Assert.assertThat;

import org.junit.Test;

import com.google.testing.compile.Compilation;
import com.google.testing.compile.Compiler;

import static com.google.testing.compile.CompilationSubject.assertThat;
import static com.google.testing.compile.JavaFileObjects.forResource;
import static com.google.testing.compile.JavaFileObjects.forSourceString;


/**
 * didi Create on 2024/7/4 .
 * <p>
 * Copyright (c) 2024/7/4 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/7/4 8:07 PM
 * @Description 用一句话说明文件功能
 */

public class HMAdapterProcessorTest {


    @Test
    public void testAnnotationProcessor() {
        Compilation compilation = Compiler.javac()
                .withProcessors(new HMAdapterProcessor())
                .compile(forSourceString("com.example.Request", ""
                        + "package com.example;\n"
                        + "public class Request {\n" + "}"));

        assertThat(compilation).succeeded();
    }

    @Test
    public void testAnnotationHMAdapterProcessor() {
        Compilation compilation = Compiler.javac()
                .withProcessors(new HMAdapterProcessor())
                .compile(forResource("Request.java"));

        assertThat(compilation).succeeded();
        assertThat(compilation).hadWarningCount(0);
        assertThat(compilation).hadErrorCount(0);
        assertThat(compilation).generatedSourceFile("com.didi.hummer2.compiler.Request$$JsiValueAdapter");
    }


    @Test
    public void testSbuAnnotationHMAdapterProcessor() {
        Compilation compilation = Compiler.javac()
                .withProcessors(new HMAdapterProcessor())
                .compile(forResource("MeKHttpClient.java"));

        assertThat(compilation).succeeded();
        assertThat(compilation).hadWarningCount(0);
        assertThat(compilation).hadErrorCount(0);
        assertThat(compilation).generatedSourceFile("com.didi.hummer2.compiler.Request$$JsiValueAdapter");
    }
}
