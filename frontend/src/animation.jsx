export const pageAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      when: 'beforeChildren',
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
}

export const titleAnim = {
  hidden: { y: 200 },
  show: {
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeOut',
    },
  },
}

export const fade = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

export const photoAnim = {
  hidden: {
    opacity: 0,
    scale: 1.5,
    x: -300,
    y: 300,
  },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeOut',
    },
  },
}

export const LineAnim = {
  hidden: { width: '0%' },
  show: {
    width: '100%',
    transition: { duration: 1 },
  },
}

export const Slider = {
  hidden: {
    x: '-130%',
    skew: '45deg',
  },
  show: {
    x: '100%',
    skew: '0deg',
    transition: { ease: 'easeOut', duration: 1 },
  },
}

export const SliderContainer = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.25, ease: 'easeOut' } },
}

export const scrollReveal = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.5 },
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};