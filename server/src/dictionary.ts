import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function loadDictionary(): Promise<Set<string>> {
  try {
    // Load the dictionary file
    const filePath = join(__dirname, '..', 'data', 'words.json')
    const content = await readFile(filePath, 'utf-8')
    const words = Object.keys(JSON.parse(content))

    // Filter words to only include valid ones (2-8 letters, only a-z)
    const validWords = words.filter(
      (word) => word.length >= 2 && word.length <= 8 && /^[a-z]+$/.test(word)
    )

    return new Set(validWords)
  } catch (error) {
    console.error('Error loading dictionary:', error)
    // Return a small set of common words as fallback
    return new Set(['cat', 'dog', 'hat', 'bat', 'rat', 'mat'])
  }
}
