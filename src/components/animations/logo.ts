import { Variants } from 'framer-motion'

export const container: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const letter: Variants = {
  rest: {
    y: 0,
  },
  hover: {
    y: [0, -4, 0],
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1],
      ease: 'easeInOut',
    },
  },
}

export const logo: Variants = {
  rest: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: 15,
    scale: 1.2,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10,
      delay: 1.2,
    },
  },
}
