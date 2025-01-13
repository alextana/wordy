import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

// Dictionary cache by length
const lengthDictionaries = new Map<number, Set<string>>()

// Load dictionary for specific length
function loadDictionaryForLength(length: number): Set<string> {
  if (lengthDictionaries.has(length)) {
    return lengthDictionaries.get(length)!
  }

  const filePath = join(process.cwd(), `api/data/length-${length}.txt`)
  if (!existsSync(filePath)) {
    return new Set()
  }

  const words = readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map((word) => word.toLowerCase().trim())

  const wordSet = new Set(words)
  lengthDictionaries.set(length, wordSet)
  return wordSet
}

// O(1) word check with lazy loading
export function isValidWord(word: string): boolean {
  const length = word.length
  const dictionary = loadDictionaryForLength(length)
  return dictionary.has(word.toLowerCase().trim())
}

// Get starting letters for a given length
export function getStartingLetters(length: number): string[] {
  const dictionary = loadDictionaryForLength(length)
  const letters = new Set<string>()

  for (const word of dictionary) {
    letters.add(word[0])
  }

  return Array.from(letters).sort()
}

// Get available word lengths
export const wordLengths = (() => {
  const lengths: number[] = []
  // Check common word lengths (3-15 characters)
  for (let i = 3; i <= 15; i++) {
    const filePath = join(process.cwd(), `api/data/length-${i}.txt`)
    if (existsSync(filePath)) {
      lengths.push(i)
    }
  }
  return lengths.sort()
})()
