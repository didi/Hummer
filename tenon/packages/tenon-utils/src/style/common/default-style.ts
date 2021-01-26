export const DefaultStyle = {
  "view": {
    "backgroundColor": "inherit"
  },
  "text":{
    "color": "inherit"
  }
}


/**
 * 根据Tag，获取默认样式
 * @param tag 
 */
export function getDefaultStyleByTag(tag: string):Record<string, string>{
  let style = {}
  switch(tag){
    case 'view':
      style = DefaultStyle['view']
      break;
    case 'text':
      style = DefaultStyle['text']
      break;
  }
  return style
}