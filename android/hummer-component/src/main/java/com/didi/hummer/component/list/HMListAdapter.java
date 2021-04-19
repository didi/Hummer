package com.didi.hummer.component.list;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.ViewGroup;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.pool.ObjectPool;
import com.didi.hummer.render.component.view.HMBase;

public class HMListAdapter extends RecyclerView.Adapter<HMListAdapter.ViewHolder> {

    private RecyclerView recyclerView;
    private int itemCount;
    private JSCallback typeCallback;
    private JSCallback createCallback;
    private JSCallback updateCallback;

    private Context mContext;

    private ObjectPool instanceManager;

    public HMListAdapter(Context context, ObjectPool instanceManager) {
        this.mContext = context;
        this.instanceManager = instanceManager;
    }

    public void destroy() {
        if (typeCallback != null) {
            typeCallback.release();
        }
        if (createCallback != null) {
            createCallback.release();
        }
        if (updateCallback != null) {
            updateCallback.release();
        }
    }

    @Override
    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
        super.onAttachedToRecyclerView(recyclerView);
        this.recyclerView = recyclerView;
    }

    @Override
    public void onDetachedFromRecyclerView(RecyclerView recyclerView) {
        super.onDetachedFromRecyclerView(recyclerView);
        this.recyclerView = null;
    }

    @Override
    public int getItemViewType(int position) {
        if (typeCallback == null) {
            return super.getItemViewType(position);
        }

        Object retType = typeCallback.call(position);
        if (retType == null) {
            return super.getItemViewType(position);
        }

        return ((Number) retType).intValue();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (createCallback == null) {
            return new ViewHolder(new View(mContext), null);
        }

        JSValue createdView = (JSValue) createCallback.call(viewType);
        if (createdView == null) {
            return new ViewHolder(new View(mContext), null);
        }

        HMBase view = instanceManager.get(createdView.getLong("objID"));

        if (view == null) {
            return new ViewHolder(new View(mContext), null);
        }

        return new ViewHolder(view.getView(), createdView);
    }


    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int position) {
        if (updateCallback == null || viewHolder.getJSView() == null) {
            return;
        }

        updateCallback.call(position, viewHolder.getJSView());
    }

    @Override
    public int getItemCount() {
        return itemCount;
    }

    public void setTypeCallback(JSCallback callback) {
        this.typeCallback = callback;
    }

    public void setCreateCallback(JSCallback callback) {
        this.createCallback = callback;
    }

    public void setUpdateCallback(JSCallback callback) {
        this.updateCallback = callback;
    }

    public void refresh(int count) {
        refresh(count, false);
    }

    public void refresh(int count, boolean isLoadMore) {
        int lastCount = itemCount;
        this.itemCount = count;
        if (isLoadMore && count > lastCount) {
            notifyItemRangeInserted(lastCount, count - lastCount);
        } else {
            notifyDataSetChanged();
        }
    }

    private void setLayoutParams(View view) {
        RecyclerView.LayoutManager layoutManager = recyclerView.getLayoutManager();
        view.setLayoutParams(ListUtil.isVertical(layoutManager) ?
                new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT) :
                new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        private JSValue mJSView;

        public ViewHolder(View itemView, JSValue jsValue) {
            super(itemView);
            setLayoutParams(itemView);
            mJSView = jsValue;
        }

        public JSValue getJSView() {
            return mJSView;
        }
    }
}
