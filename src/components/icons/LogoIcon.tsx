export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 15v4c0 1.1.9 2 2 2h4' />
      <path d='M21 9V5c0-1.1-.9-2-2-2h-4' />
      <path d='M3 9V5c0-1.1.9-2 2-2h4' />
      <path d='M21 15v4c0 1.1-.9 2-2 2h-4' />
      <path d='M12 3v18' />
      <path d='M3 12h18' />
    </svg>
  )
}
