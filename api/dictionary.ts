import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get directory path in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load words from the processed dictionary file
let dictionary: Set<string>
let wordLengths: number[]

try {
  const filePath = join(__dirname, 'data', 'dictionary.txt')
  const content = readFileSync(filePath, 'utf-8')
  const words = content.split('\n').map((word) => word.trim())

  // Create Set for O(1) lookups
  dictionary = new Set(words)

  // Get all valid word lengths
  wordLengths = Array.from(new Set(words.map((word) => word.length))).sort(
    (a, b) => a - b
  )
} catch (error) {
  console.error('Error loading dictionary:', error)
  // Provide minimal fallback for testing
  dictionary = new Set(['cat', 'dog', 'hat'])
  wordLengths = [3]
}

// Get starting letters for a given length
function getStartingLetters(length: number): string[] {
  const letters = new Set<string>()
  for (const word of dictionary) {
    if (word.length === length) {
      letters.add(word[0])
    }
  }
  return Array.from(letters).sort()
}

export { dictionary, wordLengths, getStartingLetters }
