import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getStartingLetters } from '../dictionary.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { length } = req.query

  if (typeof length !== 'string') {
    return res.status(400).json({ error: 'Length parameter must be a string' })
  }

  const lengthNum = parseInt(length, 10)
  if (isNaN(lengthNum)) {
    return res.status(400).json({ error: 'Length must be a valid number' })
  }

  const letters = getStartingLetters(lengthNum)
  res.json({ letters })
}
