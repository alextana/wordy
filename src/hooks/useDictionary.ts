import { useQuery, useQueries } from '@tanstack/react-query'
import { checkWord, getStartingLetters, getWordLengths } from '@/lib/api'

const DEFAULT_LENGTHS = [3, 4, 5, 6]
const DEFAULT_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export function useDictionary() {
  // Cache word lengths indefinitely
  const { data: wordLengths, isLoading: isLoadingLengths } = useQuery({
    queryKey: ['word-lengths'],
    queryFn: getWordLengths,
    staleTime: Infinity,
  })

  // Pre-fetch and cache starting letters for all available lengths
  const startingLettersQueries = useQueries({
    queries: (wordLengths?.lengths || DEFAULT_LENGTHS).map((length) => ({
      queryKey: ['starting-letters', length],
      queryFn: () => getStartingLetters(length),
      staleTime: Infinity,
    })),
  })

  const checkWordQuery = async (word: string) => {
    try {
      const { isValid } = await checkWord(word)
      return isValid
    } catch (error) {
      console.error('Error checking word:', error)
      return false
    }
  }

  const getStartingLettersQuery = async (length: number) => {
    // Get from cache based on array index matching the length index
    const lengthIndex = (wordLengths?.lengths || DEFAULT_LENGTHS).indexOf(
      length
    )
    if (lengthIndex === -1) return DEFAULT_LETTERS

    return startingLettersQueries[lengthIndex]?.data?.letters || DEFAULT_LETTERS
  }

  const isLoading =
    isLoadingLengths || startingLettersQueries.some((q) => q.isLoading)

  return {
    wordLengths: wordLengths?.lengths || DEFAULT_LENGTHS,
    isLoading,
    checkWord: checkWordQuery,
    getStartingLetters: getStartingLettersQuery,
  }
}
