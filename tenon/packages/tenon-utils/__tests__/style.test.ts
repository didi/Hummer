import {styleTransformer} from '../src/style'
import {transformAttr} from '../src/style/transformer/attrname'
import {transformUnit} from '../src/style/transformer/unit'
import {transformColor} from '../src/style/transformer/color'
import {transformBreakToken} from '../src/style/transformer/break-token'
import {transformBorder} from '../src/style/transformer/border'
import {transformShadow} from '../src/style/transformer/shadow'
import {transformTransition} from '../src/style/transformer/transition'
import {transformTransform} from '../src/style/transformer/transform'




describe('base', () => {
  test('style', () => {
    const result = styleTransformer.transformStyle({
      "width": "10px",
      "margin": "20px",
      "margin-left": "10px",
      "color": "white",
      "box-shadow": "5px 5px 10px 10px #000000",
      "border": "1px solid #eeeeee"
    })
    expect(result).toEqual({
      width: "10px",
      marginTop: "20px",
      marginRight: "20px",
      marginBottom: "20px",
      marginLeft: "10px",
      color: "#ffffff",
      shadow: "5px 5px 10px #000000",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#eeeeee"
    })
  })

  test('style middleware attrname', () => {
    const result = transformAttr({
      "margin-left": "10px"
    })
    expect(result).toEqual({
      marginLeft: "10px"
    })
  })

  test('style middleware unit', () => {
    // vm，依赖环境，在浏览器中测试
    const result = transformUnit({
      "width": "10px"
    })
    expect(result).toEqual({
      width: "10px"
    })
  })

  test('style middleware color', () => {
    const result = transformColor({
      "color": "white"
    })
    expect(result).toEqual({
      color: "#ffffff"
    })
  })

  test('style middleware break token', () => {
    const result = transformBreakToken({
      "margin": "10px 20px"
    })
    expect(result).toEqual({
      "margin-top": "10px",
      "margin-right": "20px",
      "margin-bottom": "10px",
      "margin-left": "20px"
    })

    expect(transformBreakToken({
      "padding": "10px 20px"
    })).toEqual({
      "padding-top": "10px",
      "padding-right": "20px",
      "padding-bottom": "10px",
      "padding-left": "20px"
    })

    expect(transformBreakToken({
      "border-width": "1px"
    })).toEqual({
      "border-width-top": "1px",
      "border-width-right": "1px",
      "border-width-bottom": "1px",
      "border-width-left": "1px"
    })

  })

  test('style middleware transform border', () => {
    const result = transformBorder({
      "border-left": "1px solid #eeeeee"
    })
    expect(result).toEqual({
      "border-left-width": "1px",
      "border-left-style": "solid",
      "border-left-color": "#eeeeee"
    })
  })

  test('style middleware transform shadow', () => {
    const result = transformShadow({
      "box-shadow": "5px 5px 10px 10px #000000"
    })
    expect(result).toEqual({
      "shadow": "5px 5px 10px #000000"
    })
  })

  test('style middleware transform transition', () => {
    const result = transformTransition({
      "transition": "margin-right 4s, color 1s"
    })
    expect(result).toEqual({
      "transition-property": "margin-right,color",
      "transition-duration": "4,1",
      "transition-timing-function": "ease",
      "transition-delay": "0"
    })
  })

  test('style middleware transform transform', () => {
    const result = transformTransform({
      "transform": "translate(10rem,10rem) scale(0.5)"
    })
    expect(result).toEqual({
      "transform": "translate(1000.00hm,1000.00hm),scale(0.5)"
    })
  })
})
