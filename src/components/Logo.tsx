import { motion } from 'framer-motion'
import { LogoIcon } from './icons/LogoIcon'
import { container, letter, logo } from './animations/logo'

export function Logo() {
  return (
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
  )
}
