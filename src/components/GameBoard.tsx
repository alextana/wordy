import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LetterInput } from './LetterInput'
import { motion } from 'framer-motion'
import type { GameState } from '@/types'

interface GameBoardProps {
  gameState: GameState
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onStartRound: () => void
}

export function GameBoard({
  gameState,
  onInputChange,
  onSubmit,
  onStartRound,
}: GameBoardProps) {
  return (
    <div className='flex-1 grid place-content-center p-4 md:p-0'>
      <Card className='w-[min(600px,100%)] bg-slate-900/50 border-slate-800 backdrop-blur-sm'>
        <CardContent className='pt-8 pb-8 space-y-8'>
          {!gameState.isPlaying ? (
            <motion.div
              className='space-y-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className='text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text'>
                Word Game
              </h2>
              <p className='text-slate-300 text-center text-base md:text-lg'>
                Create words using the letters provided. <br />
                Longer words score more points!
              </p>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={onStartRound}
                  className='w-full text-base md:text-lg h-10 md:h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/20'
                  size='lg'
                >
                  Start Game
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <>
              <motion.h2
                className='text-3xl md:text-4xl font-bold text-center space-y-2'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                key={gameState.round}
              >
                <div className='bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text'>
                  Make a {gameState.targetLength}-letter word
                </div>
                <div className='text-xl md:text-2xl text-slate-300'>
                  starting with{' '}
                  <span className='text-emerald-400 font-bold'>
                    {gameState.requiredLetter.toUpperCase()}
                  </span>
                </div>
              </motion.h2>

              <form onSubmit={onSubmit} className='space-y-8'>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  key={gameState.round}
                >
                  <LetterInput
                    length={gameState.targetLength}
                    value={gameState.currentInput}
                    onChange={onInputChange}
                    disabled={!gameState.isPlaying}
                    round={gameState.round}
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    type='submit'
                    className='w-full text-base md:text-lg h-10 md:h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/20'
                  >
                    Submit Word
                  </Button>
                </motion.div>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
