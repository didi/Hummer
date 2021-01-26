/* Apply to 1 property */
/* property name | duration */
// transition: margin-right 4s; => transition: 'margin-right 4 ease 0'

// import { values } from "puppeteer/DeviceDescriptors"

/* property name | duration | delay */
// transition: margin-right 4s 1s; => transition: 'margin-right 4 ease 1'

/* property name | duration | timing function */
// transition: margin-right 4s ease-in-out; => transition: 'margin-right 4 ease-in-out 0'

/* property name | duration | timing function | delay */
// transition: margin-right 4s ease-in-out 1s; => transition: 'margin-right 4 ease-in-out 1'

/* Apply to 2 properties */
// transition: margin-right 4s, color 1s;

/* Apply to all changed properties */
// transition: all 0.5s ease-out;
const transitionFullProperty = ['transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function']

export function transformTransition(style: Record<string, string>) {
  let tempStyle: Record<string, string> = {
    ...style
  }
  transitionFullProperty.forEach(property => {
    if(tempStyle[property]) {
      let value = tempStyle[property]
      tempStyle = {
        ...getHummerProp(property, value),
        ...tempStyle
      }
      delete tempStyle[property]
    }
  });
  if (tempStyle['transition']) {
    let value = tempStyle['transition']
    tempStyle = {
      ...splitToFullProps(value),
      ...tempStyle
    }
    delete tempStyle['transition']
  }
  return tempStyle
}

function getHummerProp(property: string, value: string) {
  let obj: Record<string, string> = {}
  obj[property] = isTime(value)? value.replace('s', ''): value
  return obj
}

function splitToFullProps(params: string) {
  let transitionPropertyArray: Array<string> = []
  let transitionDurationArray: Array<string> = []
  let transitionTimingFunctionArray: Array<string> = []
  let transitionDelayArray: Array<string> = []

  let transitionArray = params.split(',')
  transitionArray.forEach(transition => {
    let transitonValues = transition.trim().split(/\s+/g)
    transitonValues = getFullValues(transitonValues)
    transitionPropertyArray.push(transitonValues[0])
    transitionDurationArray.push(transitonValues[1].replace('s', ''))
    transitionTimingFunctionArray.push(transitonValues[2])
    transitionDelayArray.push(transitonValues[3].replace('s', ''))
  });
  return {
    'transition-property': transitionPropertyArray.join(','),
    'transition-duration': transitionDurationArray.join(','),
    'transition-timing-function': transitionTimingFunctionArray[0],
    'transition-delay': transitionDelayArray[0]
  }

}

function getFullValues(transitonValues: Array<string>) {
  let tempArray = []
  tempArray = [...transitonValues]
  if (transitonValues.length === 2) {
    tempArray = [...transitonValues, 'ease', '0s']
  } else if (transitonValues.length === 3) {
    if (isTime(transitonValues[2])) {
      tempArray = [transitonValues[0], transitonValues[1], 'ease', transitonValues[2]]
    } else {
      tempArray = [...transitonValues, '0s']
    }
  }
  return tempArray
}

function isTime(str: string) {
  return /^\d*[s]$/.test(str)
}