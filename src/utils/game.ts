import { DICTIONARY } from '@/config'

// Letter frequency weights based on common English usage
const LETTER_WEIGHTS: Record<string, number> = {
  e: 10,
  t: 9,
  a: 9,
  i: 9,
  n: 8,
  o: 8,
  s: 8,
  h: 8,
  r: 8,
  d: 7,
  l: 7,
  u: 7,
  c: 6,
  m: 6,
  f: 6,
  w: 6,
  y: 6,
  g: 5,
  p: 5,
  b: 5,
  v: 4,
  k: 4,
  x: 2,
  q: 2,
  j: 2,
  z: 2,
}

// Length weights - make longer words less common
const LENGTH_WEIGHTS: Record<number, number> = {
  3: 10, // most common
  4: 9,
  5: 8,
  6: 7,
  7: 5,
  8: 3, // less common
  9: 2, // rare
}

export function getRandomWordLength() {
  // Create weighted array of possible lengths
  const possibleLengths = Object.entries(LENGTH_WEIGHTS).flatMap(
    ([length, weight]) => {
      return Array(weight).fill(parseInt(length))
    }
  )

  return possibleLengths[Math.floor(Math.random() * possibleLengths.length)]
}

export function getRandomStartingLetter(length: number): string {
  // Get all words of the target length
  const validWords = DICTIONARY.filter((word) => word.length === length)

  // Get unique starting letters and their frequencies
  const letterFrequencies = new Map<string, number>()
  validWords.forEach((word) => {
    const firstLetter = word[0]
    letterFrequencies.set(
      firstLetter,
      (letterFrequencies.get(firstLetter) || 0) + 1
    )
  })

  // Weight letters by both their frequency in valid words and general English usage
  const weightedLetters = Array.from(letterFrequencies.entries()).flatMap(
    ([letter, freq]) => {
      // Combine natural frequency with English usage weight
      const weight = Math.ceil(
        (freq / validWords.length) * 10 * (LETTER_WEIGHTS[letter] || 1)
      )
      return Array(weight).fill(letter)
    }
  )

  // If no valid letters (shouldn't happen), fallback to common letters
  if (weightedLetters.length === 0) {
    return 'a'
  }

  return weightedLetters[Math.floor(Math.random() * weightedLetters.length)]
}
