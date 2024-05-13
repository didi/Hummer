package com.didi.hummer2.component.hummer.loading;

import android.content.Context;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ProgressBar;

import com.didi.hummer2.HummerContext;
import com.didi.hummer2.annotationx.Component;
import com.didi.hummer2.component.R;
import com.didi.hummer2.engine.JSValue;
import com.didi.hummer2.render.component.view.HMBase;
//
//import com.didi.hummer.annotation.Component;
//import com.didi.hummer.component.R;
//import com.didi.hummer.context.HummerContext;
//import com.didi.hummer.core.engine.JSValue;
//import com.didi.hummer.render.component.view.HMBase;


@Component("Loading")
public class Loading extends HMBase<FrameLayout> {

    private ProgressBar progress;

    public Loading(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);

        progress = new ProgressBar(getContext());
        progress.setIndeterminateDrawable(getContext().getResources().getDrawable(R.drawable.loading_anim));

        getView().addView(progress, new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
    }

    @Override
    protected FrameLayout createViewInstance(Context context) {
        return new FrameLayout(context);
    }

//    @JsMethod("startAnimating")
//    public void startAnimating() {
//        progress.setVisibility(android.view.View.VISIBLE);
//    }
//
//    @JsMethod("stopAnimating")
//    public void stopAnimating() {
//        progress.setVisibility(android.view.View.GONE);
//    }

}
