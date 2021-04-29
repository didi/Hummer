package com.didi.hummer.component.switchview;

import android.content.Context;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.support.annotation.Nullable;
import android.widget.CompoundButton;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsAttribute;
import com.didi.hummer.annotation.JsProperty;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.component.view.HMBase;
import com.didi.hummer.render.event.view.SwitchEvent;
import com.didi.hummer.render.style.HummerStyleUtils;

@Component("Switch")
public class Switch extends HMBase<android.widget.Switch> implements CompoundButton.OnCheckedChangeListener {
    @Nullable
    private Integer mOnTrackColor;
    @Nullable
    private Integer mOffTrackColor;

    public Switch(HummerContext context, JSValue jsValue, String viewID) {
        super(context, jsValue, viewID);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        getView().setOnCheckedChangeListener(this);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        getView().setOnCheckedChangeListener(null);
    }

    @Override
    protected android.widget.Switch createViewInstance(Context context) {
        return new android.widget.Switch(context);
    }

    /**
     * 是否打开
     */
    @JsProperty("checked")
    private boolean checked;

    public void setChecked(boolean checked) {
        doChecked(checked);
    }

    @JsAttribute("onColor")
    public void setOnColor(int color) {
        mOnTrackColor = color;
        if (getView().isChecked()) {
            setTrackColor(color);
        }
    }

    @JsAttribute("offColor")
    public void setOffColor(int color) {
        mOffTrackColor = color;
        if (!getView().isChecked()) {
            setTrackColor(color);
        }
    }

    @JsAttribute("thumbColor")
    public void setThumbColor(int color) {
        setColor(getView().getThumbDrawable(), color);
    }

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        checked = isChecked;
        setTrackColor(isChecked);

        SwitchEvent switchEvent = new SwitchEvent();
        switchEvent.setType(SwitchEvent.HM_EVENT_TYPE_SWITCH);
        switchEvent.setTimestamp(System.currentTimeMillis());
        switchEvent.setState(isChecked);
        mEventManager.dispatchEvent(SwitchEvent.HM_EVENT_TYPE_SWITCH, switchEvent);
    }

    public void doChecked(boolean checked) {
        if (getView().isChecked() != checked) {
            getView().setChecked(checked);
            setTrackColor(checked);
        }
    }

    private void setColor(Drawable drawable, @Nullable Integer color) {
        if (color == null) {
            drawable.clearColorFilter();
        } else {
            drawable.setColorFilter(color, PorterDuff.Mode.MULTIPLY);
        }
    }

    private void setTrackColor(boolean checked) {
        setTrackColor(checked ? mOnTrackColor : mOffTrackColor);
    }

    private void setTrackColor(@Nullable Integer color) {
        setColor(getView().getTrackDrawable(), color);
    }

    @Override
    public void resetStyle() {
        super.resetStyle();
        mOnTrackColor = null;
        mOffTrackColor = null;
        getView().getTrackDrawable().clearColorFilter();
        getView().getThumbDrawable().clearColorFilter();
    }

    @Override
    public boolean setStyle(String key, Object value) {
        switch (key) {
            case HummerStyleUtils.Hummer.ON_COLOR:
                setOnColor((int) value);
                break;
            case HummerStyleUtils.Hummer.OFF_COLOR:
                setOffColor((int) value);
                break;
            case HummerStyleUtils.Hummer.THUMB_COLOR:
                setThumbColor((int) value);
                break;
            default:
                return false;
        }
        return true;
    }
}
