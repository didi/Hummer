import { url } from '@kit.ArkTS';

export function parseImageSrc(src:string, root?:string) : ResourceStr | undefined {
  if(!src){
    return undefined;
  }
  // 绝对路径
  if(src.startsWith("http") || src.startsWith("file")){
    return src;
  }else if(src.startsWith('//')){
    //自动补充scheme
    try {
      const base = url.URL.parseURL(root);
      const scheme = base.protocol;
      return scheme + ':' +src;
    } catch (e){
      //参考目前 ios/android 兜底逻辑
      return 'https:'+ src
    }
  }else if(src.startsWith('/')){
    //绝对路径
    return 'file:/' + src;
  }
  else if(src.startsWith('.')){
    //相对路径
    try {
      const result = url.URL.parseURL(src, root);
      return result.toString()
    } catch (e) {
      return undefined
    }
  }else{
    //resource
    src = src.replace("assets://", "")
    const resource = 'app.media.'+src;
    return $r(resource)
  }
}

