const baseAnimation = {
  duration: 5000, // 动画持续时间，单位 ms
  repeatCount: -1, // 重复的次数（-1 无限次，0,1 一次）
  easing: "linear"
}

export const animFadeIn = {
  ...baseAnimation,
  styles: {
    opacity: 1,
  },
}

export const animFadeOut = {
  ...baseAnimation,
  styles: {
    opacity: 0,
  },
}

export const animRotation = {
  ...baseAnimation,
  styles: {
    rotationZ: 180,
  },
}

export const animTranslation = {
  ...baseAnimation,
  styles: {
    position: {
      x: "100hm",
      y: 0,
    },
  },
}

export const animScale = {
  ...baseAnimation,
  styles: {
    scale: 0.5,
  },
}

export const animBackground = {
  ...baseAnimation,
  styles: {
    backgroundColor: "black",
  },
}

export const animWidth = {
  ...baseAnimation,
  styles: {
    width: "1.5rem",
  },
}

export const animHeight = {
  ...baseAnimation,
  styles: {
    height: "1.5rem",
  },
}