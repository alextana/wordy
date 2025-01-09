import { useQuery } from '@tanstack/react-query'
import { checkWord, getStartingLetters, getWordLengths } from '@/lib/api'

const DEFAULT_LENGTHS = [3, 4, 5, 6]
const DEFAULT_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export function useDictionary() {
  const { data: wordLengths, isLoading: isLoadingLengths } = useQuery({
    queryKey: ['word-lengths'],
    queryFn: getWordLengths,
    staleTime: Infinity,
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
    try {
      const { letters } = await getStartingLetters(length)
      return letters
    } catch (error) {
      console.error('Error getting starting letters:', error)
      return DEFAULT_LETTERS
    }
  }

  return {
    wordLengths: wordLengths?.lengths || DEFAULT_LENGTHS,
    isLoading: isLoadingLengths,
    checkWord: checkWordQuery,
    getStartingLetters: getStartingLettersQuery,
  }
}
