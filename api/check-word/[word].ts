import type { VercelRequest, VercelResponse } from '@vercel/node'
import { dictionary } from '../dictionary.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { word } = req.query

  if (typeof word !== 'string') {
    return res.status(400).json({ error: 'Word parameter must be a string' })
  }

  const isValid = dictionary.has(word.toLowerCase())
  res.json({ isValid })
}
