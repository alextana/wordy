export interface Multiplier {
  value: number
  reason: string
  expiresAt: number
}

export interface Toast {
  id: number
  message: string
  type: 'error' | 'success'
}

export interface GameState {
  targetLength: number
  timeLeft: number
  score: number
  isPlaying: boolean
  currentInput: string
  round: number
  lastPoints?: number
  activeMultipliers: Multiplier[]
  combo: number
  wordCount: number
  requiredLetter: string
  usedWords: Set<string>
  toast?: Toast
  isPaused?: boolean
}

export interface GameConfig {
  ROUND_TIME: number
  LETTERS_PER_ROUND: number
}
