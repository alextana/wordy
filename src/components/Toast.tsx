import { motion, AnimatePresence } from 'framer-motion'
import type { Toast as ToastType } from '@/types'

interface ToastProps {
  toast?: ToastType
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null

  return (
    <AnimatePresence>
      <motion.div
        key={toast.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50'
      >
        <div
          className={`px-6 py-3 rounded-lg shadow-lg ${
            toast.type === 'error'
              ? 'bg-red-500/90 text-white'
              : 'bg-emerald-500/90 text-white'
          }`}
        >
          {toast.message}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
