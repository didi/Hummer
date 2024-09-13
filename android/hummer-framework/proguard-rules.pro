# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile


## Hummer
-keep @interface com.didi.hummer2.annotation.*
-keep @com.didi.hummer2.annotation.HMComponent class * {*;}
-keep @com.didi.hummer2.annotation.HMJsiValue class * {*;}
-keep class com.didi.hummer2.HummerContext{*;}
-keep class com.didi.hummer2.engine.** {*;}
-keep class com.didi.hummer2.bridge.** {*;}
-keep class com.didi.hummer2.falcon.** {*;}
-keep class com.didi.hummer2.invoke.** {*;}
-keep class com.didi.hummer2.exception.** {*;}
-keep class com.didi.hummer2.render.component.anim.AnimViewWrapper {*;}
-keep class com.facebook.yoga.** {*;}
-keep class com.facebook.jni.** {*;}