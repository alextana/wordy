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
    <div className='absolute top-8 right-8 flex items-center gap-4'>
      <div className='flex flex-col items-end'>
        <div className='text-sm text-slate-400'>Words Found</div>
        <div className='text-xl font-bold text-slate-200'>{wordCount}</div>
      </div>
      <div className='w-px h-12 bg-slate-700' />
      <div className='flex flex-col items-end'>
        <div className='text-sm text-slate-400'>Score</div>
        <div className='text-4xl font-bold text-emerald-400'>
          {score.toString()}
        </div>
      </div>
      <AnimatePresence>
        {typeof lastPoints === 'number' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className='text-2xl font-bold text-cyan-400'
          >
            +{lastPoints.toString()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
