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

  return (
    <div className='h-screen w-screen flex flex-col dark bg-slate-950'>
      <Header />
      <div className='flex flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950'>
        <Sidebar timeLeft={gameState.timeLeft} round={gameState.round} />
        <div className='flex-1 relative h-[calc(100vh-3.5rem)] grid place-content-center'>
          <ScoreDisplay
            score={gameState.score}
            lastPoints={gameState.lastPoints}
            wordCount={gameState.wordCount}
          />
          <MultiplierDisplay
            multipliers={gameState.activeMultipliers}
            combo={gameState.combo}
          />
          {gameState.timeLeft === 0 ? (
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
        </div>
      </div>
    </div>
  )
}

export default App
