const baseAnimation = {
  duration: 5000,
  repeatCount: -1,
  easing: "linear",
  onStart: () => {
    // 动画开始
    console.log("Animation Start!");
  },
  onEnd: () => {
    // 动画结束
    console.log("Animation End!");
  },
}

export const animStep = {
  steps: [
    {
      ...baseAnimation,
      styles: {
        opacity: 0,
        position: {
          x: "100hm",
          y: 0,
        },
      },
    },
    {
      ...baseAnimation,
      styles: {
        opacity: 1,
        position: {
          x: "200hm",
          y: 0,
        },
      },
    },
  ],
}

export const translateStep = {
  steps: [
    {
      ...baseAnimation,
      styles: {
        position: {
          x: "100hm",
          y: 0,
        },
      },
    },
    {
      ...baseAnimation,
      styles: {
        position: {
          x: "200hm",
          y: 0,
        },
      },
    },
  ],
}
