import {compile, parse} from '../src'

describe('base', () => {

  test('base compile', () => {
    const template = `
    <view>
      <view>
        <text>View Text</text>
        <view>
          <image>Sub Content</image>
        </view>
      </view>
      <page style="color:black;background-color:#33ff33"></page>
      <component></component>
    </view>
    `
    compile(template, {})
  })

  test('base compile v-if', () => {
    const template = `
    <view>
      <view v-if="flag">
        <text>View Text</text>
        <view>
          <image>Sub Content</image>
        </view>
      </view>
    </view>
    `
    compile(template, {})
  })

  test('base compile v-on', () => {
    const template = `
    <view>
      <view v-on:click="handleClick">
        <text>View Text</text>
        <view>
          <image>Sub Content</image>
        </view>
      </view>
    </view>
    `
    compile(template, {})
  })

  test('base compile @', () => {
    const template = `
    <view>
      <view @click="handleClick">
        <text>View Text</text>
        <view>
          <image>Sub Content</image>
        </view>
      </view>
      <page @success="handleSuccess"></page>
    </view>
    `
    compile(template, {})
  })

  test('base compile v-model', () => {
    const template = `
    <view>
     <input v-model="form.name"/>
    </view>
    `
    compile(template, {})
  })
  test('base parse', () => {
    const template = `
    <view>
      <view>
        <text>View Text</text>
        <view>
          <text>Sub Content</text>
        </view>
      </view>
    </view>
    `
    parse(template, {})
  })
})
