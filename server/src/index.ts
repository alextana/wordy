import express from 'express'
import cors from 'cors'
import { loadDictionary } from './dictionary.js'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

// Load dictionary on startup
const dictionary = await loadDictionary()

app.get('/api/check-word/:word', (req, res) => {
  const word = req.params.word.toLowerCase()
  const isValid = dictionary.has(word)
  res.json({ isValid })
})

app.get('/api/starting-letters/:length', (req, res) => {
  const length = parseInt(req.params.length)
  const letters = new Set<string>()

  for (const word of dictionary) {
    if (word.length === length) {
      letters.add(word[0])
    }
  }

  res.json({ letters: Array.from(letters).sort() })
})

app.get('/api/word-lengths', (_req, res) => {
  const lengths = new Set<number>()

  for (const word of dictionary) {
    lengths.add(word.length)
  }

  res.json({ lengths: Array.from(lengths).sort((a, b) => a - b) })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
