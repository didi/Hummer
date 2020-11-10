package com.didi.hummer.compiler;

import javax.annotation.processing.Messager;
import javax.tools.Diagnostic;

/**
 * Simplify the message print.
 *
 * Created by XiaoFeng on 2019-09-18.
 */
public class Logger {

    private static final String PREFIX_OF_LOGGER = "[Hummer::Compiler]";
    private Messager msg;

    public Logger(Messager messager) {
        msg = messager;
    }

    /**
     * Print info log.
     */
    public void info(CharSequence info) {
        if (info != null && info.length() > 0) {
            msg.printMessage(Diagnostic.Kind.NOTE, PREFIX_OF_LOGGER + info);
        }
    }

    public void error(CharSequence error) {
        if (error != null && error.length() > 0) {
            msg.printMessage(Diagnostic.Kind.ERROR, PREFIX_OF_LOGGER + "An exception is encountered, [" + error + "]");
        }
    }

    public void error(Throwable error) {
        if (error != null) {
            msg.printMessage(Diagnostic.Kind.ERROR, PREFIX_OF_LOGGER + "An exception is encountered, [" + error.getMessage() + "]" + "\n" + formatStackTrace(error.getStackTrace()));
        }
    }

    public void warning(CharSequence warning) {
        if (warning != null && warning.length() > 0) {
            msg.printMessage(Diagnostic.Kind.WARNING, PREFIX_OF_LOGGER + warning);
        }
    }

    private String formatStackTrace(StackTraceElement[] stackTrace) {
        StringBuilder sb = new StringBuilder();
        for (StackTraceElement element : stackTrace) {
            sb.append("    at ").append(element.toString());
            sb.append("\n");
        }
        return sb.toString();
    }
}