const vRtl = {
  beforeMount(el, {value}) {
    if(true){
      // 需要 RTL 翻转
      if(value === 'text'){
        el.style = {
          transform: "scaleX(-1)",
          textAlign: 'right'
        }
      }else {
        el.style = {
          transform: "scaleX(-1)"
        }
      }
    }

  },
  mounted(el, {value}) {
  }
}

export default vRtl