package com.didi.hummer2.devtools.widget;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.graphics.Color;
import android.text.method.ScrollingMovementMethod;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.didi.hummer2.BuildConfig;
import com.didi.hummer2.HummerContext;
import com.didi.hummer2.devtools.HummerDevTools;
import com.didi.hummer2.devtools.R;
import com.didi.hummer2.devtools.bean.LogBean;
import com.didi.hummer2.devtools.bean.NetBean;
import com.didi.hummer2.devtools.manager.HummerLogManager;
import com.didi.hummer2.devtools.manager.HummerNetManager;
import com.didi.hummer2.devtools.utils.JSONFormat;
import com.didi.hummer2.render.utility.DPUtil;
import com.didi.hummer2.utils.ScreenUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: linjizong
 * @date: 2020-04-20
 * @desc: 显示hummer输出的console日志
 */
public class ConsoleView extends FrameLayout implements HummerLogManager.ILogListener {

    private List<LogBean> logs = new ArrayList<>();
    private View layoutConsole;
    private View btnClearLog;
    private RecyclerView rvConsole;
    private ViewGroup layoutInfo;
    private ScrollView scrollInfo;
    private TextView tvInfo;
    private View tabConsole;
    private View tabParams;
    private View tabCompTree;
    private View tabCallStack;
    private View tabPerformance;
    private View tabNet;
    private HummerContext hummerContext;
    private HummerDevTools.IParameterInjector mInjector;
    private int curTabIndex;

    private List<NetBean> mNets = new ArrayList<>();

    public ConsoleView(@NonNull Context context) {
        super(context);
        init();
    }

    public ConsoleView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        switch (curTabIndex) {
            case 1:
                updateParameters();
                break;
            case 2:
                updateCompTree();
                break;
            case 3:
                updateCallStack();
                break;
            case 4:
                updatePerformance();
                break;
            case 5:
                updateNet();
                break;
            default:
                break;
        }
    }

    public void bindHummerContext(HummerContext context) {
        hummerContext = context;
    }

    public void bindParameterInjector(HummerDevTools.IParameterInjector injector) {
        mInjector = injector;
    }

    private void init() {
        LayoutInflater.from(getContext()).inflate(R.layout.layout_console_container_v2, this);

        layoutConsole = findViewById(R.id.layout_console);
        btnClearLog = findViewById(R.id.btn_clear_log);
        btnClearLog.setOnClickListener(v -> {
            clearData();
        });

        rvConsole = findViewById(R.id.rv_console);
        rvConsole.setLayoutManager(new LinearLayoutManager(getContext(), RecyclerView.VERTICAL, false));
        rvConsole.setAdapter(mAdapter);

        layoutInfo = findViewById(R.id.layout_info);
        scrollInfo = findViewById(R.id.layout_info_v);
        tvInfo = findViewById(R.id.tv_info);
        tvInfo.setMovementMethod(ScrollingMovementMethod.getInstance());
        tvInfo.setOnLongClickListener(v -> {
            copyToClipboard(tvInfo.getContext(), tvInfo.getText().toString());
            Toast.makeText(tvInfo.getContext(), "内容已复制", Toast.LENGTH_SHORT).show();
            return true;
        });

        tabConsole = findViewById(R.id.tab_console);
        tabConsole.setSelected(true);
        tabConsole.setOnClickListener(v -> {
            curTabIndex = 0;
            layoutInfo.setVisibility(GONE);
            layoutConsole.setVisibility(VISIBLE);
            tabConsole.setSelected(true);
            tabParams.setSelected(false);
            tabCompTree.setSelected(false);
            tabCallStack.setSelected(false);
            tabPerformance.setSelected(false);
            tabNet.setSelected(false);
        });

        tabParams = findViewById(R.id.tab_params);
        tabParams.setOnClickListener(v -> {
            curTabIndex = 1;
            layoutInfo.setVisibility(VISIBLE);
            layoutConsole.setVisibility(GONE);
            tabConsole.setSelected(false);
            tabParams.setSelected(true);
            tabCompTree.setSelected(false);
            tabCallStack.setSelected(false);
            tabPerformance.setSelected(false);
            tabNet.setSelected(false);
            updateParameters();
        });

        tabCompTree = findViewById(R.id.tab_comp_tree);
        tabCompTree.setOnClickListener(v -> {
            curTabIndex = 2;
            layoutInfo.setVisibility(VISIBLE);
            layoutConsole.setVisibility(GONE);
            tabConsole.setSelected(false);
            tabParams.setSelected(false);
            tabCompTree.setSelected(true);
            tabCallStack.setSelected(false);
            tabPerformance.setSelected(false);
            tabNet.setSelected(false);
            updateCompTree();
        });

        tabCallStack = findViewById(R.id.tab_call_stack);
        tabCallStack.setOnClickListener(v -> {
            curTabIndex = 3;
            layoutInfo.setVisibility(VISIBLE);
            layoutConsole.setVisibility(GONE);
            tabConsole.setSelected(false);
            tabParams.setSelected(false);
            tabCompTree.setSelected(false);
            tabCallStack.setSelected(true);
            tabPerformance.setSelected(false);
            tabNet.setSelected(false);
            updateCallStack();
        });

        tabPerformance = findViewById(R.id.tab_performance);
        tabPerformance.setOnClickListener(v -> {
            curTabIndex = 4;
            layoutInfo.setVisibility(VISIBLE);
            layoutConsole.setVisibility(GONE);
            tabConsole.setSelected(false);
            tabParams.setSelected(false);
            tabCompTree.setSelected(false);
            tabCallStack.setSelected(false);
            tabPerformance.setSelected(true);
            tabNet.setSelected(false);
            updatePerformance();
        });

        tabNet = findViewById(R.id.tab_net);
        tabNet.setOnClickListener(v -> {
            curTabIndex = 5;
            layoutInfo.setVisibility(VISIBLE);
            layoutConsole.setVisibility(GONE);
            tabConsole.setSelected(false);
            tabParams.setSelected(false);
            tabCompTree.setSelected(false);
            tabCallStack.setSelected(false);
            tabPerformance.setSelected(false);
            tabNet.setSelected(true);
            updateNet();
        });
    }

    private void updateParameters() {
        StringBuilder builder = new StringBuilder();
        builder.append("Hummer SDK Version: ");
        builder.append(BuildConfig.VERSION_NAME);
        builder.append("【");
        builder.append(getJsEngineString());
        builder.append("】");
        builder.append("\n\n\n");

//        Object env = hummerContext.getJsContext().evaluateJavaScript("JSON.stringify(Hummer.env)");
//        if (env != null) {
//            builder.append("Hummer.env: ");
//            builder.append(JSONFormat.format(String.valueOf(env)));
//            builder.append("\n\n\n");
//        }
//
//        Object pageInfo = hummerContext.getJsContext().evaluateJavaScript("JSON.stringify(Hummer.pageInfo)");
//        if (pageInfo != null) {
//            builder.append("Hummer.pageInfo: ");
//            builder.append(JSONFormat.format(String.valueOf(pageInfo)));
//            builder.append("\n\n\n");
//        }
//
//        Object pageResult = hummerContext.getJsContext().evaluateJavaScript("JSON.stringify(Hummer.pageResult)");
//        if (pageResult != null) {
//            builder.append("Hummer.pageResult: ");
//            builder.append(JSONFormat.format(String.valueOf(pageResult)));
//            builder.append("\n\n\n");
//        }

        if (mInjector != null) {
            mInjector.injectParameter(builder);
        }

        tvInfo.setText(builder.toString());
    }

    public String getJsEngineString() {
//        String className = hummerContext.getClass().getSimpleName();
//        switch (className) {
//            case "JSCHummerContext": {
//                int engine = HummerSDK.getJsEngine();
//                switch (engine) {
//                    case HummerSDK.JsEngine.JSC:
//                        return "JSC";
//                    case HummerSDK.JsEngine.HERMES:
//                        return "Hermes";
//                    case HummerSDK.JsEngine.QUICK_JS:
//                        return "QuickJS";
//                    default:
//                        return "Unknown";
//                }
//            }
//            case "NAPIHummerContext": {
//                int engine = HummerSDK.getJsEngine();
//                switch (engine) {
//                    case HummerSDK.JsEngine.NAPI_QJS:
//                        return "NAPI - QuickJS";
//                    case HummerSDK.JsEngine.NAPI_HERMES:
//                        return "NAPI - Hermes";
//                    default:
//                        return "Unknown";
//                }
//            }
//            case "V8HummerContext":
//                return "V8";
//            default:
//                return "Unknown";
//        }
        return "falconQJS";
    }

    private void updateCompTree() {
//        HummerNode node = hummerContext.getJSRootView() != null ?
//                hummerContext.getJSRootView().getNode() : null;
//        tvInfo.setText(ComponentTreeFormat.format(node));
//        scrollInfo.post(() -> scrollInfo.fullScroll(View.FOCUS_DOWN));
    }

    private void updateCallStack() {
//        InvokerAnalyzer invokerAnalyzer = hummerContext.getInvokerAnalyzer();
//        List<InvokeTracker> trackerList = null;
//        if (invokerAnalyzer instanceof HummerInvokerAnalyzer) {
//            trackerList = ((HummerInvokerAnalyzer) invokerAnalyzer).getInvokeTrackerList();
//        }

//        tvInfo.setText(CallStackFormat.format(trackerList));
//        scrollInfo.post(() -> scrollInfo.fullScroll(View.FOCUS_DOWN));
    }

    private void updatePerformance() {
//        InvokerAnalyzer invokerAnalyzer = hummerContext.getInvokerAnalyzer();
//        List<PerformanceTracker> perfTrackerList = null;
//        if (invokerAnalyzer instanceof HummerInvokerAnalyzer) {
//            perfTrackerList = ((HummerInvokerAnalyzer) invokerAnalyzer).getPerfTrackerList();
//        }
//
//        String info = PerformanceListFormat.format(perfTrackerList);
//        tvInfo.setText(info);
    }

    public void bindLog(HummerLogManager logManager) {
        logManager.registerListener(this);
        setData(logManager.getLogs());
    }

    public void addLog(LogBean log) {
        logs.add(log);
        mAdapter.notifyItemInserted(logs.size() - 1);
        rvConsole.scrollToPosition(logs.size() - 1);
    }

    public void setData(List<LogBean> logs) {
        this.logs.addAll(logs);
        mAdapter.notifyDataSetChanged();
        rvConsole.scrollToPosition(logs.size() - 1);
    }

    public void clearData() {
        this.logs.clear();
        mAdapter.notifyDataSetChanged();
    }

    @Override
    public void onLogAdd(LogBean log) {
        post(() -> addLog(log));
    }

    private void copyToClipboard(Context context, String strCopy) {
        ClipboardManager cm = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
        if (cm != null) {
            cm.setPrimaryClip(ClipData.newPlainText("Label", strCopy));
        }
    }

    RecyclerView.Adapter<ConsoleHolder> mAdapter = new RecyclerView.Adapter<ConsoleHolder>() {
        @NonNull
        @Override
        public ConsoleHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int type) {
            return new ConsoleHolder(LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.layout_console_item_v2, viewGroup, false));
        }

        @Override
        public void onBindViewHolder(@NonNull ConsoleHolder viewHolder, int position) {
            viewHolder.updateUI(position);
        }

        @Override
        public int getItemCount() {
            return logs.size();
        }
    };

    private class ConsoleHolder extends RecyclerView.ViewHolder {
        TextView tvConsole;

        ConsoleHolder(View itemView) {
            super(itemView);
            // 这里设置最小宽度是为了让RecyclerView能全屏撑开，因为在RecyclerView外套了HorizontalScrollView之后，MATCH_PARENT会失效
            itemView.setMinimumWidth(ScreenUtils.getScreenWidth(itemView.getContext()) - DPUtil.dp2px(itemView.getContext(), 24));
            tvConsole = itemView.findViewById(R.id.tv_debug_console);

            itemView.setOnLongClickListener(v -> {
                copyToClipboard(tvConsole.getContext(), tvConsole.getText().toString());
                Toast.makeText(tvConsole.getContext(), "内容已复制", Toast.LENGTH_SHORT).show();
                return true;
            });
        }

        public void updateUI(int position) {
            LogBean bean = logs.get(position);
            switch (bean.getLevel()) {
                case LogBean.LEVEL_DEBUG:
                case LogBean.LEVEL_INFO:
                case LogBean.LEVEL_LOG:
                    tvConsole.setTextColor(Color.BLACK);
                    break;
                case LogBean.LEVEL_WARN:
                    tvConsole.setTextColor(0xFFFD6D40);
                    break;
                case LogBean.LEVEL_ERROR:
                    tvConsole.setTextColor(Color.RED);
                    break;
                default:
                    tvConsole.setTextColor(Color.BLACK);
                    break;
            }
            tvConsole.setText(bean.getMsg());
        }
    }

    public void bindNet(HummerNetManager netManager) {
        mNets = netManager.getNets();
        updateNet();
    }

    private void updateNet() {
        StringBuilder builder = new StringBuilder();
        if (mNets != null) {
            int size = mNets.size();
            NetBean net;
            for (int i = 0; i < size; i++) {
                net = mNets.get(i);
                int index = (i + 1);
                builder.append("┌──────────────");
                builder.append(index);
                builder.append("─────────────\n");
                builder.append("\tUrl:\n");
                builder.append("\t");
                builder.append(net.getUrl());
                builder.append("\n\n");
                builder.append("\tData: \n");
                builder.append("\t");
                if (net.getData() == null) {
                    builder.append("null");
                } else {
                    builder.append(JSONFormat.format(net.getData().toString()));
                }
                builder.append("\n\n");
                builder.append("\tError: \n");
                builder.append("\t");
                if (net.getError() == null) {
                    builder.append("null");
                } else {
                    builder.append(net.getError().toString());
                }

                builder.append("\n└──────────────");
                builder.append(index);
                builder.append("─────────────\n\n");
            }
        }
        tvInfo.setText(builder.toString());
    }
}
