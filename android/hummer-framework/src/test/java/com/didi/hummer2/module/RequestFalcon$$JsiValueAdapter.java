package com.didi.hummer2.module;

import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.bridge.JsiValue;
import com.didi.hummer2.bridge.convert.BaseAdapter;
import com.didi.hummer2.bridge.convert.ValueParser;

import java.lang.reflect.Type;

public class RequestFalcon$$JsiValueAdapter extends BaseAdapter<RequestFalcon> {
  @Override
  public Class<RequestFalcon> getJavaClass() {
    return RequestFalcon.class;
  }

  @Override
  public RequestFalcon toJavaValue(ValueParser parser, JsiValue jsiValue, Type type) {
    RequestFalcon result = new RequestFalcon();
    JsiObject jsiObject = (JsiObject)jsiValue;
    result.url = parser.optString(jsiObject.get("url"));
    result.name = parser.optString(jsiObject.get("name"));
    result.setNamespace(parser.optString(jsiObject.get("namespace")));
    result.setOwner(parser.toJavaValue(jsiObject.get("owner"),parser.getArgumentType(type, 1)));
    result.setData(parser.toJavaValue(jsiObject.get("data"),parser.getArgumentType(type, 0)));
    result.d1 = parser.toJavaValue(jsiObject.get("d1"),parser.getParameterizedType(type,java.util.List.class, Number.class));
    result.d2 = parser.toJavaValue(jsiObject.get("d2"),parser.getParameterizedType(type,java.util.List.class,1));
    result.d3 = parser.toJavaValue(jsiObject.get("d3"),parser.getParameterizedType(type,java.util.List.class, String.class));
    result.dd = parser.toJavaValue(jsiObject.get("dd"),parser.getParameterizedType(type,java.util.List.class,1));
    result.tt = parser.toJavaValue(jsiObject.get("tt"),parser.getParameterizedType(type,java.util.Map.class,1,0));
    result.DX = parser.toJavaValue(jsiObject.get("DX"),parser.getParameterizedType(type,java.util.Map.class,1,parser.getParameterizedType(type,java.util.Map.class,0,2)));
    result.DXP = parser.toJavaValue(jsiObject.get("DXP"),parser.getParameterizedType(type,java.util.Map.class,1,parser.getParameterizedType(type,java.util.Map.class,0,parser.getParameterizedType(type,java.util.List.class,2))));
    return result;
  }

  @Override
  public JsiValue toJsiValue(ValueParser parser, RequestFalcon value) {
    JsiObject result =  null;
    if (value instanceof RequestFalcon) {
      RequestFalcon param = (RequestFalcon)value ;
      result =  new JsiObject();
      result.put("url",parser.toJsiValue(param.url));
      result.put("name",parser.toJsiValue(param.name));
      result.put("namespace",parser.toJsiValue(param.getNamespace()));
      result.put("owner",parser.toJsiValue(param.getOwner()));
      result.put("data",parser.toJsiValue(param.getData()));
      result.put("d1",parser.toJsiValue(param.d1));
      result.put("d2",parser.toJsiValue(param.d2));
      result.put("d3",parser.toJsiValue(param.d3));
      result.put("dd",parser.toJsiValue(param.dd));
      result.put("tt",parser.toJsiValue(param.tt));
      result.put("DX",parser.toJsiValue(param.DX));
      result.put("DXP",parser.toJsiValue(param.DXP));
    }
    return result;
  }
}
