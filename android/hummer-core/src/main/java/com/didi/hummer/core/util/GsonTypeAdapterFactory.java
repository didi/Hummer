package com.didi.hummer.core.util;

import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.gson.TypeAdapterFactory;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;

/**
 * 处理Gson解析时部分字段类型不匹配的问题
 *
 * Created by XiaoFeng on 2020/12/22.
 */
public class GsonTypeAdapterFactory implements TypeAdapterFactory {

    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
        final TypeAdapter<T> adapter = gson.getDelegateAdapter(this, type);
        return new TypeAdapter<T>() {
            @Override
            public void write(JsonWriter out, T value) throws IOException {
                adapter.write(out, value);
            }

            @Override
            public T read(JsonReader in) throws IOException {
                //gson 库会通过JsonReader对json对象的每个字段进项读取,当发现类型不匹配时抛出异常
                try {
                    return adapter.read(in);
                } catch (Throwable e) {
                    //那么我们就在它抛出异常的时候进行处理,让它继续不中断接着往下读取其他的字段就好了
                    consumeAll(in);
                    return null;
                }

            }

            private void consumeAll(JsonReader in) throws IOException {
                if (in.hasNext()) {
                    JsonToken peek = in.peek();
                    if (peek == JsonToken.STRING) {
                        in.nextString();
                    } else if (peek == JsonToken.BEGIN_ARRAY) {
                        in.beginArray();
                        consumeAll(in);
                        in.endArray();
                    } else if (peek == JsonToken.BEGIN_OBJECT) {
                        in.beginObject();
                        consumeAll(in);
                        in.endObject();
                    } else if (peek == JsonToken.END_ARRAY) {
                        in.endArray();
                    } else if (peek == JsonToken.END_OBJECT) {
                        in.endObject();
                    } else if (peek == JsonToken.NUMBER) {
                        in.nextString();
                    } else if (peek == JsonToken.BOOLEAN) {
                        in.nextBoolean();
                    } else if (peek == JsonToken.NAME) {
                        in.nextName();
                        consumeAll(in);
                    } else if (peek == JsonToken.NULL) {
                        in.nextNull();
                    }
                }
            }
        };
    }
}
