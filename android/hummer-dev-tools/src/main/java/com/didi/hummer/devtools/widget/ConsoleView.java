package com.didi.hummer.devtools.widget;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.method.ScrollingMovementMethod;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.BuildConfig;
import com.didi.hummer.core.debug.InvokerAnalyzerManager;
import com.didi.hummer.devtools.HummerDevTools;
import com.didi.hummer.devtools.bean.LogBean;
import com.didi.hummer.devtools.manager.HummerLogManager;
import com.didi.hummer.devtools.utils.JSONFormat;
import com.didi.hummer.hummerdebug.R;
import com.didi.hummer.render.utility.DPUtil;
import com.didi.hummer.utils.ScreenUtils;

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
    private HummerContext hummerContext;
    private HummerDevTools.IParameterInjector mInjector;
    private int curTabIndex;

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
        switch(curTabIndex) {
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
        LayoutInflater.from(getContext()).inflate(R.layout.hummer_debug_container, this);

        layoutConsole = findViewById(R.id.layout_console);
        btnClearLog = findViewById(R.id.btn_clear_log);
        btnClearLog.setOnClickListener(v -> {
            clearData();
        });

        rvConsole = findViewById(R.id.rv_console);
        rvConsole.setLayoutManager(new LinearLayoutManager(getContext(), LinearLayout.VERTICAL, false));
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
            updatePerformance();
        });
    }

    private void updateParameters() {
        StringBuilder builder = new StringBuilder();
        builder.append("Hummer SDK Version: ");
        builder.append(BuildConfig.VERSION_NAME);
        builder.append("\n\n\n");

        Object env = hummerContext.getJsContext().evaluateJavaScript("JSON.stringify(Hummer.env)");
        if (env != null) {
            builder.append("Hummer.env: ");
            builder.append(JSONFormat.format(String.valueOf(env)));
            builder.append("\n\n\n");
        }

        Object pageInfo = hummerContext.getJsContext().evaluateJavaScript("JSON.stringify(Hummer.pageInfo)");
        if (pageInfo != null) {
            builder.append("Hummer.pageInfo: ");
            builder.append(JSONFormat.format(String.valueOf(pageInfo)));
            builder.append("\n\n\n");
        }

        Object pageResult = hummerContext.getJsContext().evaluateJavaScript("JSON.stringify(Hummer.pageResult)");
        if (pageResult != null) {
            builder.append("Hummer.pageResult: ");
            builder.append(JSONFormat.format(String.valueOf(pageResult)));
            builder.append("\n\n\n");
        }

        if (mInjector != null) {
            mInjector.injectParameter(builder);
        }

        tvInfo.setText(builder.toString());
    }

    private void updateCompTree() {
        String info = InvokerAnalyzerManager.getInstance().getComponentTreeFormat(hummerContext.getJsContext().getIdentify());
        tvInfo.setText(info);
        scrollInfo.post(() -> scrollInfo.fullScroll(View.FOCUS_DOWN));
    }

    private void updateCallStack() {
        String info = InvokerAnalyzerManager.getInstance().getCallStackTreeFormat(hummerContext.getJsContext().getIdentify());
        tvInfo.setText(info);
        scrollInfo.post(() -> scrollInfo.fullScroll(View.FOCUS_DOWN));
    }

    private void updatePerformance() {
        String info = InvokerAnalyzerManager.getInstance().getPerformanceFormat(hummerContext.getJsContext().getIdentify());
        tvInfo.setText(info);
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
            return new ConsoleHolder(LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.hummer_debug_console_item, viewGroup, false));
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
                case LogBean.LEVEL_EXCEPTION:
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
}
