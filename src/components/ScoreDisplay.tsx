import { motion, AnimatePresence } from 'framer-motion'

interface ScoreDisplayProps {
  score: number
  lastPoints?: number
  wordCount: number
}

export function ScoreDisplay({
  score,
  lastPoints,
  wordCount,
}: ScoreDisplayProps) {
  return (
    <div className='md:absolute md:right-8 md:top-8 text-center md:text-right space-y-2 absolute left-1/2 -translate-x-1/2 top-32 md:translate-x-0 md:left-auto'>
      <div className='text-sm text-slate-400'>Score</div>
      <div className='text-3xl md:text-4xl font-bold text-emerald-400'>
        {score}
      </div>
      <AnimatePresence>
        {lastPoints && (
          <motion.div
            key={`${lastPoints}-${wordCount}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className='text-lg md:text-xl text-emerald-400/50'
          >
            +{lastPoints}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
