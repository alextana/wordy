import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function saveDictionary() {
  console.log('Fetching dictionary...')
  const response = await fetch(
    'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json'
  )
  const data = await response.json()

  const words = Object.keys(data).filter(
    (word) => word.length >= 2 && word.length <= 8 && /^[a-z]+$/.test(word)
  )

  const fileContent = `// This file is auto-generated
export const dictionary = ${JSON.stringify(words, null, 2)} as const`

  const outputPath = path.join(__dirname, '../src/data/dictionary.ts')
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, fileContent)

  console.log(`Saved ${words.length} words to dictionary.ts`)
}

saveDictionary().catch(console.error)
