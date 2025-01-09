import { dictionary } from './data/dictionary'

// Calculate max length once using a for loop instead of map/reduce
let maxLength = 0
for (const word of dictionary) {
  if (word.length > maxLength) {
    maxLength = word.length
  }
}

export const GAME_CONFIG = {
  MIN_LETTERS: 3,
  MAX_LETTERS: maxLength,
  ROUND_TIME: 15,
  MULTIPLIER_DURATION: 10000, // 10 seconds in milliseconds
} as const

export const DICTIONARY = dictionary
