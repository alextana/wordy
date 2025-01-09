import { useState } from 'react'
import Draggable from 'react-draggable'
import { GAME_CONFIG } from '@/config'
import { ChevronDown, ChevronUp, GripVertical, Pause, Play } from 'lucide-react'

interface DebugPanelProps {
  onSetLength: (length: number) => void
  onSetLetter: (letter: string) => void
  onSetTime: (seconds: number) => void
  onTogglePause: () => void
  currentLength: number
  currentLetter: string
  currentTime: number
  isPaused: boolean
}

export function DebugPanel({
  onSetLength,
  onSetLetter,
  onSetTime,
  onTogglePause,
  currentLength,
  currentLetter,
  currentTime,
  isPaused,
}: DebugPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [timeInput, setTimeInput] = useState(currentTime.toString())

  // Only show in development
  if (import.meta.env.PROD) return null

  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const lengths = Array.from(
    { length: GAME_CONFIG.MAX_LETTERS - GAME_CONFIG.MIN_LETTERS + 1 },
    (_, i) => i + GAME_CONFIG.MIN_LETTERS
  )

  const handleTimeChange = (value: string) => {
    setTimeInput(value)
    const seconds = parseInt(value)
    if (!isNaN(seconds)) {
      onSetTime(seconds)
    }
  }

  return (
    <Draggable handle='.handle'>
      <div className='fixed top-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 w-64 z-50'>
        <div className='flex items-center justify-between p-2 border-b border-slate-700 handle cursor-move'>
          <div className='flex items-center gap-2'>
            <GripVertical className='w-4 h-4 text-slate-400' />
            <div className='text-sm font-semibold text-slate-300'>
              Debug Controls
            </div>
          </div>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className='p-1 hover:bg-slate-700 rounded'
          >
            {isCollapsed ? (
              <ChevronDown className='w-4 h-4 text-slate-400' />
            ) : (
              <ChevronUp className='w-4 h-4 text-slate-400' />
            )}
          </button>
        </div>

        {!isCollapsed && (
          <div className='p-4 space-y-4'>
            <div className='space-y-2'>
              <div className='text-xs text-slate-400'>Time Control</div>
              <div className='flex gap-2'>
                <input
                  type='number'
                  value={timeInput}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className='flex-1 bg-slate-700 text-white rounded px-2 py-1 text-sm'
                  min='0'
                  max='999'
                />
                <button
                  onClick={onTogglePause}
                  className={`p-2 rounded ${
                    isPaused
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {isPaused ? (
                    <Play className='w-4 h-4' />
                  ) : (
                    <Pause className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>

            <div className='space-y-2'>
              <div className='text-xs text-slate-400'>Word Length</div>
              <div className='grid grid-cols-5 gap-1'>
                {lengths.map((length) => (
                  <button
                    key={length}
                    onClick={() => onSetLength(length)}
                    className={`p-2 text-sm rounded ${
                      currentLength === length
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>

            <div className='space-y-2'>
              <div className='text-xs text-slate-400'>Starting Letter</div>
              <div className='grid grid-cols-6 gap-1'>
                {letters.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => onSetLetter(letter)}
                    className={`p-2 text-sm rounded uppercase ${
                      currentLetter === letter
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  )
}
