import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface SidebarProps {
  timeLeft: number
  round: number
}

export function Sidebar({ timeLeft, round }: SidebarProps) {
  return (
    <aside className='w-64 md:h-full border-r border-slate-800 p-4 bg-slate-900/50'>
      <Card className='bg-slate-900/50 border-slate-800'>
        <CardHeader>
          <CardTitle className='bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text'>
            Game Stats
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <div className='text-sm text-slate-400'>Round</div>
            <div className='text-3xl font-bold text-slate-50'>{round}</div>
          </div>
          <Separator className='bg-slate-800' />
          <div>
            <div className='text-sm text-slate-400'>Time Left</div>
            <div className='text-3xl font-bold text-cyan-400'>{timeLeft}s</div>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
