import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { GameBoard } from './components/GameBoard'
import { ScoreDisplay } from './components/ScoreDisplay'
import { MultiplierDisplay } from './components/MultiplierDisplay'
import { GameOverScreen } from './components/GameOverScreen'
import { Toast } from './components/Toast'
import { DebugPanel } from './components/DebugPanel'
import { useGameState } from './hooks/useGameState'

function App() {
  const {
    gameState,
    startNewRound,
    handleSubmit,
    restartGame,
    updateInput,
    setDebugLength,
    setDebugLetter,
    setDebugTime,
    togglePause,
  } = useGameState()

  const isGameOver = gameState.timeLeft === 0

  return (
    <div className='h-screen w-screen flex flex-col dark bg-slate-950'>
      <Header />
      <div className='flex flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950'>
        <div className='hidden md:block'>
          <Sidebar timeLeft={gameState.timeLeft} round={gameState.round} />
        </div>

        <div className='flex-1 relative h-[calc(100vh-3.5rem)] grid place-content-center'>
          {!isGameOver && (
            <>
              <div className='md:hidden absolute top-4 left-4 right-4 flex justify-between items-center bg-slate-900/50 rounded-lg p-4 border border-slate-800'>
                <div>
                  <div className='text-sm text-slate-400'>Round</div>
                  <div className='text-2xl font-bold text-slate-50'>
                    {gameState.round}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-400'>Time Left</div>
                  <div className='text-2xl font-bold text-cyan-400'>
                    {gameState.timeLeft}s
                  </div>
                </div>
              </div>

              <ScoreDisplay
                score={gameState.score}
                lastPoints={gameState.lastPoints}
                wordCount={gameState.wordCount}
              />
              <MultiplierDisplay
                multipliers={gameState.activeMultipliers}
                combo={gameState.combo}
              />
            </>
          )}
          {isGameOver ? (
            <GameOverScreen
              score={gameState.score}
              wordCount={gameState.wordCount}
              usedWords={gameState.usedWords}
              onRestart={restartGame}
            />
          ) : (
            <GameBoard
              gameState={gameState}
              onInputChange={updateInput}
              onSubmit={handleSubmit}
              onStartRound={startNewRound}
            />
          )}
          <Toast toast={gameState.toast} />
          {import.meta.env.DEV && (
            <DebugPanel
              onSetLength={setDebugLength}
              onSetLetter={setDebugLetter}
              onSetTime={setDebugTime}
              onTogglePause={togglePause}
              currentLength={gameState.targetLength}
              currentLetter={gameState.requiredLetter}
              currentTime={gameState.timeLeft}
              isPaused={gameState.isPaused || false}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
