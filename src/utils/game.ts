import { GAME_CONFIG } from '@/config'

// These functions are moved to the API to support multiplayer sync
export function validateWordLength(length: number): boolean {
  return length >= GAME_CONFIG.MIN_LETTERS && length <= GAME_CONFIG.MAX_LETTERS
}
