import { motion, AnimatePresence } from 'framer-motion'
import type { Multiplier } from '@/types'

interface MultiplierDisplayProps {
  multipliers: Multiplier[]
  combo: number
}

export function MultiplierDisplay({
  multipliers,
  combo,
}: MultiplierDisplayProps) {
  return (
    <div className='absolute left-8 top-8 space-y-2'>
      <AnimatePresence>
        {combo > 1 && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            className='text-2xl font-bold text-orange-400'
          >
            {combo}x Combo!
          </motion.div>
        )}
        {multipliers.map((multiplier) => (
          <motion.div
            key={`${multiplier.reason}-${multiplier.expiresAt}`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            className='bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 text-lg'
          >
            <span className='text-emerald-400 font-bold'>
              {multiplier.value}x
            </span>
            <span className='text-slate-300'> {multiplier.reason}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
