import { LogoIcon } from './icons/LogoIcon'

export function Header() {
  return (
    <header className='px-4 border-b border-border bg-slate-900'>
      <div className='container flex items-center h-14 gap-2'>
        <LogoIcon className='w-6 h-6 text-emerald-500' />
        <h1 className='text-xl font-bold text-slate-50'>WordGrid</h1>
      </div>
    </header>
  )
}
