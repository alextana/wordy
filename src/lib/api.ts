const API_URL = '/api'

export async function checkWord(word: string): Promise<{ isValid: boolean }> {
  const response = await fetch(`${API_URL}/check-word/${word}`)
  return response.json()
}

export async function getStartingLetters(
  length: number
): Promise<{ letters: string[] }> {
  const response = await fetch(`${API_URL}/starting-letters/${length}`)
  return response.json()
}

export async function getWordLengths(): Promise<{ lengths: number[] }> {
  const response = await fetch(`${API_URL}/word-lengths`)
  return response.json()
}
