import { Logo } from './Logo'

export function Header() {
  return (
    <header className='px-4 border-b border-border bg-slate-900'>
      <div className='container flex items-center h-14 gap-2'>
        <Logo />
      </div>
    </header>
  )
}
