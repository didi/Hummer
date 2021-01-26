import {diff} from '../src/plugins/utils/index'

describe('Store Utils Test', () => {

  test('Diff Test', () => {
    let left = {
      a: 1,
      b: 2,
      c: {
        name: 'c'
      }
    }
    let right = {
      a: 2,
      d: "D",
      c: {
        name: 'd'
      }
    }
    let ops = diff(left, right)
    console.log(ops)
  })

  test('Diff Array Test', () => {
    let left = {
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
    let right = {
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
    let ops = diff(left, right)
    console.log(ops)
  })
})
