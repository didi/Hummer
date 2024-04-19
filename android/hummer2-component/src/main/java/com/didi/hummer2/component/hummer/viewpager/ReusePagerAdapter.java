//package com.didi.hummer2.component.hm.viewpager;
//
//import android.view.View;
//import android.view.ViewGroup;
//
//import androidx.viewpager.widget.PagerAdapter;
//
//import com.didi.hummer.component.R;
//
//import java.util.LinkedList;
//
///**
// * Created by XiaoFeng on 2020-01-10.
// */
//public abstract class ReusePagerAdapter<VH extends ReusePagerAdapter.Holder> extends PagerAdapter {
//
//    private LinkedList<VH> holders = new LinkedList<>();
//
//    /**
//     * 获取 item count
//     *
//     * @return count
//     */
//    public abstract int getItemCount();
//
//    /**
//     * 创建 holder
//     *
//     * @param parent   parent
//     * @param position position
//     * @return holder
//     */
//    public abstract VH onCreateViewHolder(ViewGroup parent, int position);
//
//    /**
//     * 绑定 holder
//     *
//     * @param holder   holder
//     * @param position position
//     */
//    public abstract void onBindViewHolder(VH holder, int position);
//
//    @Override
//    public int getCount() {
//        return getItemCount();
//    }
//
//    @Override
//    public Object instantiateItem(ViewGroup container, int position) {
//        // 根据 type 找到缓存的 list
//        VH holder;
//        if (holders == null) {
//            // 如果 list 为空，表示没有缓存
//            // 调用 onCreateViewHolder 创建一个 holder
//            holder = onCreateViewHolder(container, position);
//            holder.itemView.setTag(R.id.holder_id, holder);
//        } else {
//            holder = holders.pollLast();
//            if (holder == null) {
//                // 如果 list size = 0，表示没有缓存
//                // 调用 onCreateViewHolder 创建一个 holder
//                holder = onCreateViewHolder(container, position);
//                holder.itemView.setTag(R.id.holder_id, holder);
//            }
//        }
//        holder.position = position;
//        // 调用 onBindViewHolder 对 itemView 填充数据
//        onBindViewHolder(holder, position);
//        container.addView(holder.itemView);
//        return holder.itemView;
//    }
//
//    @Override
//    public void destroyItem(ViewGroup container, int position, Object object) {
//        View view = (View) object;
//        container.removeView(view);
//        VH holder = (VH) view.getTag(R.id.holder_id);
//        // 缓存 holder
//        holders.push(holder);
//    }
//
//    @Override
//    public boolean isViewFromObject(View view, Object object) {
//        return view == object;
//    }
//
//    public static abstract class Holder {
//        public View itemView;
//        public int position;
//
//        public Holder(View view) {
//            if (view == null) {
//                throw new IllegalArgumentException("itemView may not be null");
//            }
//            itemView = view;
//        }
//    }
//}