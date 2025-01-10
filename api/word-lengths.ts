import type { VercelRequest, VercelResponse } from '@vercel/node'
import { wordLengths } from './dictionary.js'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.json({ lengths: wordLengths })
}
