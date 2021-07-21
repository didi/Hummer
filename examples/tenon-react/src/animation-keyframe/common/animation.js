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

export const animFadeIn = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        opacity: 0,
      },
      percent: 0,
    },
    {
      styles: {
        opacity: 1,
      },
      percent: 1,
    },
  ],
}

export const animFadeOut = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        opacity: 1,
      },
      percent: 0,
    },
    {
      styles: {
        opacity: 0,
      },
      percent: 1,
    },
  ],
}

export const animRotation = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        rotationZ: 0,
      },
      percent: 0,
    },
    {
      styles: {
        rotationZ: 180,
      },
      percent: 1,
    },
  ],
}

export const animTranslation = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        position: {
          x: 0,
          y: 0,
        },
      },
      percent: 0,
    },
    {
      styles: {
        position: {
          x: "1rem",
          y: 0,
        },
      },
      percent: 1,
    },
  ],
}

export const animTranslationBack = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        position: {
          x: "1rem",
          y: 0,
        },
      },
      percent: 0,
    },
    {
      styles: {
        position: {
          x: "0",
          y: 0,
        },
      },
      percent: 1,
    },
  ],
}
export const animScale = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        scale: 0,
      },
      percent: 0,
    },
    {
      styles: {
        scale: 1,
      },
      percent: 1,
    },
  ],
}
export const animScaleBack = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        scale: 1,
      },
      percent: 0,
    },
    {
      styles: {
        scale: 0,
      },
      percent: 1,
    },
  ],
}
export const animBackground = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        backgroundColor: "#FA9153",
      },
      percent: 0,
    },
    {
      styles: {
        backgroundColor: "black",
      },
      percent: 1,
    },
  ],
}

export const animBackgroundBack = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        backgroundColor: "black",
      },
      percent: 0,
    },
    {
      styles: {
        backgroundColor: "#FA9153",
      },
      percent: 1,
    },
  ],
}

export const animWidth = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        width: "1rem",
      },
      percent: 0,
    },
    {
      styles: {
        width: "1.5rem",
      },
      percent: 1,
    },
  ],
}

export const animWidthBack = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        width: "1.5rem",
      },
      percent: 0,
    },
    {
      styles: {
        width: "1rem",
      },
      percent: 1,
    },
  ],
}

export const animHeight = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        height: "1rem",
      },
      percent: 0,
    },
    {
      styles: {
        height: "1.5rem",
      },
      percent: 1,
    },
  ]
}

export const animHeightBack = {
  ...baseAnimation,
  keyframes: [
    {
      styles: {
        height: "1.5rem",
      },
      percent: 0,
    },
    {
      styles: {
        height: "1rem",
      },
      percent: 1,
    },
  ],
}