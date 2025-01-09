import { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import { GAME_CONFIG } from '@/config'
import { ChevronDown, ChevronUp, GripVertical, Pause, Play } from 'lucide-react'

// Constants for panel dimensions
const HEADER_HEIGHT = 48
const EXPANDED_CONTENT_HEIGHT = 450
const PANEL_WIDTH = 256 // w-64 = 16rem = 256px
const MARGIN = 20

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
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [timeInput, setTimeInput] = useState(currentTime.toString())
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const nodeRef = useRef(null)

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

  const handleCollapse = () => {
    const willExpand = isCollapsed
    setIsCollapsed(!isCollapsed)

    // If expanding, make sure we're not too close to the bottom
    if (willExpand) {
      const totalHeight = HEADER_HEIGHT + EXPANDED_CONTENT_HEIGHT
      const maxY = window.innerHeight - totalHeight - MARGIN

      if (position.y > maxY) {
        setPosition((prev) => ({ ...prev, y: maxY }))
      }
    }
  }

  // Calculate initial position
  useEffect(() => {
    const totalHeight = isCollapsed
      ? HEADER_HEIGHT
      : HEADER_HEIGHT + EXPANDED_CONTENT_HEIGHT
    setPosition({
      x: window.innerWidth - PANEL_WIDTH - MARGIN,
      y: window.innerHeight - totalHeight - MARGIN,
    })
  }, []) // Only run once on mount

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const totalHeight = isCollapsed
        ? HEADER_HEIGHT
        : HEADER_HEIGHT + EXPANDED_CONTENT_HEIGHT
      const maxX = window.innerWidth - PANEL_WIDTH - MARGIN
      const maxY = window.innerHeight - totalHeight - MARGIN

      setPosition((prev) => ({
        x: Math.max(0, Math.min(maxX, prev.x)),
        y: Math.max(0, Math.min(maxY, prev.y)),
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isCollapsed]) // Only depend on isCollapsed state

  return (
    <div className='fixed inset-0 pointer-events-none'>
      <Draggable
        nodeRef={nodeRef}
        handle='.handle'
        position={position}
        onStop={(e, data) => {
          setPosition({ x: data.x, y: data.y })
        }}
        bounds='parent'
      >
        <div
          ref={nodeRef}
          className='pointer-events-auto bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 w-64'
        >
          <div className='flex items-center justify-between p-2 border-b border-slate-700 handle cursor-move'>
            <div className='flex items-center gap-2'>
              <GripVertical className='w-4 h-4 text-slate-400' />
              <div className='text-sm font-semibold text-slate-300'>
                Debug Controls
              </div>
            </div>
            <button
              onClick={handleCollapse}
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
    </div>
  )
}
