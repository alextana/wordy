import { useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface LetterInputProps {
  length: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  round: number
}

export function LetterInput({
  length,
  value,
  onChange,
  disabled,
  round,
}: LetterInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus the second input when round changes since first letter is pre-filled
    if (inputRefs.current[1]) {
      inputRefs.current[1].focus()
    }
  }, [round])

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChar = e.target.value.slice(-1)
    const newValue = value.split('')
    newValue[index] = newChar
    onChange(newValue.join(''))

    // Move to next input if we have a character and there's a next input
    if (newChar && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className='flex justify-center gap-2'>
      {Array.from({ length }).map((_, index) => (
        <Input
          key={`${round}-${index}`}
          ref={(el) => (inputRefs.current[index] = el)}
          type='text'
          maxLength={1}
          className={cn(
            'w-16 h-16 text-center text-3xl font-bold',
            'bg-slate-800 border-slate-700',
            'focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500',
            'transition-all duration-200 shadow-lg',
            'uppercase',
            index === 0 && 'bg-slate-700' // Highlight first letter
          )}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled || index === 0} // Disable first input since it's pre-filled
        />
      ))}
    </div>
  )
}
