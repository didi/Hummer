const listDelimiterRE = /;(?![^(]*\))/g
const propertyDelimiterRE = /:(.+)/
export type NormalizedStyle = Record<string, string | number>

export function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {}
  cssText.split(listDelimiterRE).forEach(item => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE)
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return ret
}
