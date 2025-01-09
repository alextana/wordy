import { motion, Variants } from 'framer-motion'
import { LogoIcon } from './icons/LogoIcon'

const container: Variants = {
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

const letter: Variants = {
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

const logo: Variants = {
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
      delay: 1.2, // Delay for 8 letters * 0.1s stagger + 0.1s initial delay + 0.3s buffer
    },
  },
}

export function Header() {
  return (
    <header className='px-4 border-b border-border bg-slate-900'>
      <div className='container flex items-center h-14 gap-2'>
        <motion.div
          className='flex items-center gap-2 cursor-pointer'
          variants={container}
          whileHover='hover'
          animate='rest'
        >
          <motion.div variants={logo}>
            <LogoIcon className='w-6 h-6 text-emerald-500' />
          </motion.div>
          <div className='overflow-hidden'>
            <h1 className='text-xl font-bold text-slate-50 flex'>
              {'WordGrid'.split('').map((char, i) => (
                <motion.span key={i} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
