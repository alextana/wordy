import { GAME_CONFIG } from '@/config'

export function getRandomWordLength(
  availableLengths: number[] = [3, 4, 5, 6]
): number {
  const validLengths = availableLengths.filter(
    (length) =>
      length >= GAME_CONFIG.MIN_LETTERS && length <= GAME_CONFIG.MAX_LETTERS
  )
  if (validLengths.length === 0) return GAME_CONFIG.MIN_LETTERS
  const index = Math.floor(Math.random() * validLengths.length)
  return validLengths[index]
}

export function getRandomStartingLetter(_length: number): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const index = Math.floor(Math.random() * letters.length)
  return letters[index]
}
