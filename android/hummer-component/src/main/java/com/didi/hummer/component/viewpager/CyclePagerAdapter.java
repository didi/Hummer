package com.didi.hummer.component.viewpager;

import android.content.Context;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.imageloader.IImageLoaderAdapter;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.pool.ObjectPool;
import com.didi.hummer.render.component.view.HMBase;
import com.zhpan.bannerview.utils.BannerUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by XiaoFeng on 2020-01-09.
 */
public class CyclePagerAdapter extends ReusePagerAdapter<CyclePagerAdapter.ViewHolder> {

    private Context mContext;
    private ObjectPool mInstanceManager;

    private List<Object> mList = new ArrayList<>();

    private boolean mIsCanLoop;
    private OnItemClickListener mOnItemClickListener;

    private JSCallback mOnItemViewCallback;

    public static final int MAX_VALUE = 100000;

    public interface OnItemClickListener {
        void onItemClick(int position);
    }

    public CyclePagerAdapter(Context context, ObjectPool instanceManager) {
        mContext = context;
        mInstanceManager = instanceManager;
    }

    public void setData(List<Object> data) {
        mList = new ArrayList<>();
        mList.addAll(data);
        notifyDataSetChanged();
    }

    public void setCanLoop(boolean loop) {
        mIsCanLoop = loop;
    }

    public boolean isCanLoop() {
        return mIsCanLoop;
    }

    public void setOnItemClickListener(OnItemClickListener listener) {
        mOnItemClickListener = listener;
    }

    public void setOnItemViewCallback(JSCallback callback) {
        mOnItemViewCallback = callback;
    }

    private View makeDefaultImageView(int position) {
        Object obj = mList.get(position);
        if (obj == null) {
            return new View(mContext);
        }
        String url = obj.toString();
        if (TextUtils.isEmpty(url)) {
            return new View(mContext);
        }
        ImageView imageView = new ImageView(mContext);
        imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
        getImageLoader(((HummerContext) mContext)).setImage(url, imageView);
        return imageView;
    }

    public int getRealPosition(int position) {
        return BannerUtils.getRealPosition(mIsCanLoop, position, mList.size());
    }

    private static IImageLoaderAdapter getImageLoader(HummerContext context) {
        return HummerAdapter.getImageLoaderAdapter(context.getNamespace());
    }

    @Override
    public int getItemCount() {
        if (mIsCanLoop && mList.size() > 1) {
            return MAX_VALUE;
        } else {
            return mList.size();
        }
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int position) {
        int realPosition = getRealPosition(position);
        if (mOnItemViewCallback == null) {
            return new ViewHolder(makeDefaultImageView(realPosition), null);
        }

        JSValue jsView = (JSValue) mOnItemViewCallback.call(realPosition);
        if (jsView == null) {
            return new ViewHolder(makeDefaultImageView(realPosition), null);
        }

        jsView.protect();
        HMBase view = mInstanceManager.get(jsView.getLong("objID"));

        if (view == null || view.getView() == null) {
            return new ViewHolder(makeDefaultImageView(realPosition), null);
        }

        return new ViewHolder(view.getView(), jsView);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        holder.bind(getRealPosition(position));
    }

    public class ViewHolder extends ReusePagerAdapter.Holder {

        private boolean isJustCreated = true;
        private JSValue jsView;
        private int position;

        public ViewHolder(View view, JSValue jsValue) {
            super(view);
            this.jsView = jsValue;

            itemView.setOnClickListener(v -> {
                if (mOnItemClickListener != null) {
                    mOnItemClickListener.onItemClick(position);
                }
            });
        }

        public void bind(int position) {
            this.position = position;

            if (isJustCreated) {
                isJustCreated = false;
                return;
            }

            if (mOnItemViewCallback != null && jsView != null) {
                mOnItemViewCallback.call(position, jsView);
            } else {
                if (itemView instanceof ImageView) {
                    String url = mList.get(position).toString();
                    if (!TextUtils.isEmpty(url)) {
                        getImageLoader(((HummerContext) mContext)).setImage(url, (ImageView) itemView);
                    }
                }
            }
        }
    }
}
