package com.didi.hummer.devtools.qrcode;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.didi.hummer.devtools.R;
import com.didi.hummer.devtools.zxing.activity.CaptureActivity;

import java.util.List;

/**
 * didi Create on 2023/4/25 .
 * <p>
 * Copyright (c) 2023/4/25 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2023/4/25 2:42 下午
 * @Description 用一句话说明文件功能
 */

public class QrcodeMainActivity extends AppCompatActivity {

    private static final int REQUEST_CAMERA = 2;
    private static final int REQUEST_QR_CODE = 3;
    private static final String[] PERMISSIONS_CAMERA = {Manifest.permission.CAMERA};
    private RecyclerView recyclerView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        preUpdateStatusBar(this);
        setLightStatusBar();

        setContentView(R.layout.activity_qrcode_main);
        recyclerView = findViewById(R.id.history);
        findViewById(R.id.back).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        findViewById(R.id.qrcode).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startScanQrcode();
            }
        });

        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        DividerItemDecoration decoration = new DividerItemDecoration(this, DividerItemDecoration.VERTICAL);
        decoration.setDrawable(getResources().getDrawable(R.drawable.dk_divider));
        recyclerView.addItemDecoration(decoration);

        QrcodeAdapter adapter = new QrcodeAdapter(QrcodeHistoriesManager.getInstance().getHistory());
        adapter.setOnItemClickListener(new OnItemClickListener() {
            @Override
            public void onItemClick(View view, String data) {
                QrcodeHistoriesManager.getInstance().onQrcodeReceive(data);
                finish();
            }
        });
        recyclerView.setAdapter(adapter);
    }

    private void startScanQrcode() {
        if (!ownPermissionCheck()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                requestPermissions(PERMISSIONS_CAMERA, REQUEST_CAMERA);
            }
            return;
        }
        Intent intent = new Intent(this, CaptureActivity.class);
        startActivityForResult(intent, REQUEST_QR_CODE);
    }

    private boolean ownPermissionCheck() {
        int permission = ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA);
        if (permission != PackageManager.PERMISSION_GRANTED) {
            return false;
        }
        return true;
    }


    private void preUpdateStatusBar(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            activity.getWindow().setStatusBarColor(getResources().getColor(R.color.dk_white_color));
        }
    }

    private void setLightStatusBar() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        }
    }

    private void setNotLightStatusBar() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK && requestCode == REQUEST_QR_CODE) {
            Bundle bundle = data.getExtras();
            String result = bundle.getString(CaptureActivity.INTENT_EXTRA_KEY_QR_SCAN);
            Log.i("HummerNative", "qrcode url=" + result);
            if (!TextUtils.isEmpty(result)) {
                QrcodeHistoriesManager.getInstance().saveHistory(result);
                QrcodeHistoriesManager.getInstance().onQrcodeReceive(result);
                finish();
            }
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == REQUEST_CAMERA) {
            for (int grantResult : grantResults) {
                if (grantResult == -1) {
                    Toast.makeText(this, R.string.dk_error_tips_permissions_less, Toast.LENGTH_SHORT).show();
                }
            }
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    private class QrcodeAdapter extends RecyclerView.Adapter {
        private List<String> mHistory;
        private OnItemClickListener mOnItemClickListener;

        public QrcodeAdapter(List<String> mHistory) {
            this.mHistory = mHistory;
        }

        @NonNull
        @Override
        public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_qrcode_history, parent, false);
            return new ItemViewHolder(view, this);
        }

        @Override
        public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
            if (holder instanceof ItemViewHolder) {
                ((ItemViewHolder) holder).onBindViewHolder(mHistory.get(position));
            }
        }

        @Override
        public int getItemCount() {
            return mHistory.size();
        }


        public void onItemClick(View view, String data) {
            if (mOnItemClickListener != null) {
                mOnItemClickListener.onItemClick(view, data);
            }
        }

        public void setOnItemClickListener(OnItemClickListener onItemClickListener) {
            mOnItemClickListener = onItemClickListener;
        }
    }


    private class ItemViewHolder extends RecyclerView.ViewHolder {
        private TextView textView;
        private String data;

        public ItemViewHolder(@NonNull View itemView, QrcodeAdapter adapter) {
            super(itemView);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    adapter.onItemClick(v, data);
                }
            });
            textView = itemView.findViewById(R.id.text);
        }

        public void onBindViewHolder(String data) {
            this.data = data;
            textView.setText(data);
        }
    }


    public interface OnItemClickListener {
        void onItemClick(View view, String data);
    }
}
