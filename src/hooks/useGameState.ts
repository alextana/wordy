import { useState, useEffect } from 'react'
import { GAME_CONFIG } from '@/config'
import { calculateWordScore } from '@/utils/scoring'
import { getRandomWordLength, getRandomStartingLetter } from '@/utils/game'
import { useDictionary } from './useDictionary'
import type { GameState } from '@/types'

let toastId = 0

export function useGameState() {
  const dictionary = useDictionary()
  const [gameState, setGameState] = useState<GameState>(() => ({
    targetLength: getRandomWordLength(dictionary.wordLengths),
    timeLeft: GAME_CONFIG.ROUND_TIME,
    score: 0,
    isPlaying: false,
    currentInput: '',
    round: 0,
    lastPoints: undefined,
    activeMultipliers: [],
    combo: 0,
    wordCount: 0,
    requiredLetter: 'a',
    usedWords: new Set(),
    isPaused: false,
  }))

  // Debug controls
  const setDebugLength = (length: number) => {
    if (import.meta.env.PROD) return
    setGameState((prev: GameState) => ({
      ...prev,
      targetLength: length,
      currentInput: prev.requiredLetter,
    }))
  }

  const setDebugLetter = (letter: string) => {
    if (import.meta.env.PROD) return
    setGameState((prev: GameState) => ({
      ...prev,
      requiredLetter: letter.toLowerCase(),
      currentInput: letter.toLowerCase(),
    }))
  }

  const setDebugTime = (seconds: number) => {
    if (import.meta.env.PROD) return
    setGameState((prev: GameState) => ({
      ...prev,
      timeLeft: Math.max(0, Math.min(999, seconds)),
    }))
  }

  const togglePause = () => {
    if (import.meta.env.PROD) return
    setGameState((prev: GameState) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }))
  }

  // Clear toast after 2 seconds
  useEffect(() => {
    if (gameState.toast) {
      const timer = setTimeout(() => {
        setGameState((prev) => ({ ...prev, toast: undefined }))
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [gameState.toast])

  // Combined timer effect for both countdown and multiplier cleanup
  useEffect(() => {
    let gameTimer: number
    let multiplierTimer: number

    if (gameState.isPlaying && gameState.timeLeft > 0 && !gameState.isPaused) {
      gameTimer = window.setInterval(() => {
        setGameState((prev) => {
          if (prev.timeLeft <= 1) {
            clearInterval(gameTimer)
            return { ...prev, timeLeft: 0, isPlaying: false }
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 }
        })
      }, 1000)

      // Cleanup expired multipliers
      multiplierTimer = window.setInterval(() => {
        const now = Date.now()
        setGameState((prev) => ({
          ...prev,
          activeMultipliers: prev.activeMultipliers.filter(
            (m) => m.expiresAt > now
          ),
        }))
      }, 1000)
    }

    return () => {
      clearInterval(gameTimer)
      clearInterval(multiplierTimer)
    }
  }, [gameState.isPlaying, gameState.isPaused])

  const showToast = (message: string, type: 'error' | 'success') => {
    setGameState((prev) => ({
      ...prev,
      toast: {
        id: ++toastId,
        message,
        type,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const word = gameState.currentInput.toLowerCase()

    if (gameState.usedWords.has(word)) {
      showToast(`You've already used "${word}"!`, 'error')
      setGameState((prev) => ({ ...prev, combo: 0 }))
      return
    }

    if (!word.startsWith(gameState.requiredLetter)) {
      showToast(
        `Word must start with "${gameState.requiredLetter.toUpperCase()}"`,
        'error'
      )
      setGameState((prev) => ({ ...prev, combo: 0 }))
      return
    }

    if (word.length !== gameState.targetLength) {
      showToast(
        `Word must be exactly ${gameState.targetLength} letters long`,
        'error'
      )
      setGameState((prev) => ({ ...prev, combo: 0 }))
      return
    }

    const isValid = await dictionary.checkWord(word)
    if (!isValid) {
      showToast(`"${word}" is not in the dictionary`, 'error')
      setGameState((prev) => ({ ...prev, combo: 0 }))
      return
    }

    // Valid word
    const { points, multipliers = [] } = calculateWordScore(
      word,
      gameState.combo + 1
    )
    const now = Date.now()

    const newLength = getRandomWordLength()
    const newLetter = getRandomStartingLetter(newLength)

    setGameState((prev) => ({
      ...prev,
      score: prev.score + points,
      timeLeft: GAME_CONFIG.ROUND_TIME,
      isPlaying: true,
      currentInput: newLetter,
      targetLength: newLength,
      requiredLetter: newLetter,
      round: prev.round + 1,
      lastPoints: points,
      combo: prev.combo + 1,
      wordCount: prev.wordCount + 1,
      usedWords: new Set([...prev.usedWords, word]),
      activeMultipliers: [
        ...prev.activeMultipliers,
        ...multipliers.map((m) => ({
          ...m,
          expiresAt: now + GAME_CONFIG.MULTIPLIER_DURATION,
        })),
      ],
    }))
  }

  const startNewRound = () => {
    const newLength = getRandomWordLength()
    const newLetter = getRandomStartingLetter(newLength)

    setGameState((prev) => ({
      ...prev,
      targetLength: newLength,
      requiredLetter: newLetter,
      timeLeft: GAME_CONFIG.ROUND_TIME,
      isPlaying: true,
      currentInput: newLetter,
      round: prev.round + 1,
      isPaused: false,
    }))
  }

  const restartGame = () => {
    const newLength = getRandomWordLength()
    const newLetter = getRandomStartingLetter(newLength)

    setGameState({
      targetLength: newLength,
      timeLeft: GAME_CONFIG.ROUND_TIME,
      score: 0,
      isPlaying: false,
      currentInput: '',
      round: 0,
      lastPoints: undefined,
      activeMultipliers: [],
      combo: 0,
      wordCount: 0,
      requiredLetter: newLetter,
      usedWords: new Set(),
      isPaused: false,
    })
  }

  const updateInput = (value: string) => {
    setGameState((prev) => ({ ...prev, currentInput: value }))
  }

  return {
    gameState,
    startNewRound,
    handleSubmit,
    restartGame,
    updateInput,
    setDebugLength,
    setDebugLetter,
    setDebugTime,
    togglePause,
  }
}
