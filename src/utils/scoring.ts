// Letter scores based on English letter frequency (rarer letters = more points)
const LETTER_SCORES: { [key: string]: number } = {
  e: 1,
  a: 1,
  i: 1,
  o: 1,
  n: 1,
  r: 1,
  t: 1,
  l: 1,
  s: 1,
  d: 2,
  g: 2,
  b: 2,
  c: 2,
  m: 2,
  p: 2,
  h: 2,
  k: 2,
  f: 3,
  w: 3,
  y: 3,
  v: 4,
  x: 5,
  z: 5,
  j: 5,
  q: 8, // Q is extra special
}

// Bonus multipliers for word length
const LENGTH_MULTIPLIERS: { [key: number]: number } = {
  3: 1, // base score
  4: 1.2, // 20% bonus
  5: 1.5, // 50% bonus
  6: 1.8, // 80% bonus
  7: 2.2, // 120% bonus
  8: 2.6, // 160% bonus
  9: 3, // 200% bonus
}

// Extra multiplier for starting with rare letters
const RARE_START_MULTIPLIERS: { [key: string]: number } = {
  x: 1.5,
  z: 1.5,
  j: 1.4,
  q: 1.6,
  v: 1.2,
  w: 1.2,
  y: 1.2,
}

export function calculateWordScore(
  word: string,
  currentCombo: number = 0
): { points: number; multipliers: Array<{ reason: string; value: number }> } {
  const lowercaseWord = word.toLowerCase()
  const multipliers: Array<{ reason: string; value: number }> = []

  // Calculate base score from letters
  const baseScore = lowercaseWord
    .split('')
    .reduce((score, letter) => score + (LETTER_SCORES[letter] || 1), 0)

  // Track multipliers
  const lengthMultiplier =
    LENGTH_MULTIPLIERS[word.length] || (word.length > 9 ? 3.5 : 1)
  if (lengthMultiplier > 1) {
    multipliers.push({
      reason: `${word.length}-letter word`,
      value: lengthMultiplier,
    })
  }

  const startLetterMultiplier = RARE_START_MULTIPLIERS[lowercaseWord[0]] || 1
  if (startLetterMultiplier > 1) {
    multipliers.push({
      reason: `Started with ${lowercaseWord[0].toUpperCase()}`,
      value: startLetterMultiplier,
    })
  }

  // Combo multiplier
  const comboMultiplier = currentCombo > 1 ? 1 + currentCombo * 0.1 : 1
  if (comboMultiplier > 1) {
    multipliers.push({
      reason: `${currentCombo}x Combo`,
      value: comboMultiplier,
    })
  }

  // Calculate final score with all multipliers
  const totalScore = Math.floor(
    baseScore * lengthMultiplier * startLetterMultiplier * comboMultiplier
  )

  return {
    points: totalScore,
    multipliers,
  }
}
