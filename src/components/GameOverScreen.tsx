import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'

interface GameOverScreenProps {
  score: number
  wordCount: number
  usedWords: Set<string>
  onRestart: () => void
}

export function GameOverScreen({
  score,
  wordCount,
  usedWords,
  onRestart,
}: GameOverScreenProps) {
  const averageWordLength =
    wordCount > 0
      ? Array.from(usedWords).reduce((sum, word) => sum + word.length, 0) /
        wordCount
      : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className='flex-1 grid place-content-center p-4 md:p-8'
    >
      <Card className='w-[min(600px,100%)] bg-slate-900/50 border-slate-800 backdrop-blur-sm'>
        <CardContent className='pt-8 pb-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='space-y-8'
          >
            <h2 className='text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text'>
              Game Over!
            </h2>

            <div className='grid grid-cols-2 gap-4 p-6'>
              <div className='space-y-2'>
                <div className='text-sm text-slate-400'>Final Score</div>
                <div className='text-3xl md:text-4xl font-bold text-emerald-400'>
                  {score}
                </div>
              </div>
              <div className='space-y-2'>
                <div className='text-sm text-slate-400'>Words Found</div>
                <div className='text-3xl md:text-4xl font-bold text-cyan-400'>
                  {wordCount}
                </div>
              </div>
            </div>

            <Separator className='bg-slate-800' />

            <div className='space-y-4'>
              <div className='space-y-2'>
                <div className='text-sm text-slate-400'>Stats</div>
                <div className='grid grid-cols-2 gap-2 text-slate-200'>
                  <div>Average Word Length:</div>
                  <div className='text-right font-bold'>
                    {averageWordLength.toFixed(1)}
                  </div>
                  <div>Longest Word:</div>
                  <div className='text-right font-bold'>
                    {Array.from(usedWords)
                      .reduce(
                        (longest, word) =>
                          word.length > longest.length ? word : longest,
                        ''
                      )
                      .toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            <Separator className='bg-slate-800' />

            <div className='space-y-4'>
              <div className='text-sm text-slate-400'>Words Used</div>
              <div className='flex flex-wrap gap-2'>
                {Array.from(usedWords).map((word) => (
                  <div
                    key={word}
                    className='px-2 py-1 bg-slate-800 rounded text-sm text-slate-300 uppercase'
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={onRestart}
              className='w-full text-base md:text-lg h-10 md:h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/20'
            >
              Play Again
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
