import {diff} from '../src/plugins/utils/index'

describe('Store Utils Test', () => {

  test('Diff Test', () => {
    const left = {
      a: 1,
      b: 2,
      c: {
        name: 'c'
      }
    }
    const right = {
      a: 2,
      d: "D",
      c: {
        name: 'd'
      }
    }
    const ops = diff(left, right)
    console.log(ops)
  })

  test('Diff Array Test', () => {
    const left = {
      a: 1,
      b: 2,
      c: {
        name: 'c'
      },
      arr: [{
        a: 1
      }, {
        b: 1
      }]
    }
    const right = {
      a: 2,
      d: "D",
      c: {
        name: 'd'
      },
      arr: [{
        a:1
      }, {
        b: 2
      }]
    }
    const ops = diff(left, right)
    console.log(ops)
  })
})
