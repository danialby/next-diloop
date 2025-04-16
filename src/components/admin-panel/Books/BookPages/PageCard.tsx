import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'

interface PageCardProps {
  page: {
    id: string
    type: string
    question?: string
    title?: string
  }
  index: number
  className: string
  onNavigate: (index: number) => void
  onDelete: (index: number) => void
}

export function PageCard({
  page,
  index,
  className,
  onNavigate,
  onDelete,
}: PageCardProps) {
  return (
    <div
      key={page.id}
      className={className}
      onClick={() => onNavigate(index)}
    >
      <div className="max-w-full w-full  h-full">
        <div className="flex flex-col gap-1 items-start">
          {/* <span className="absolute top-0 -right-5 text-xs p-0.25 w-8 flex items-end justify-end h-4 rounded-bl-sm bg-black text-white">{index + 1}</span> */}
          <span className="text-xs text-gray-600 truncate max-w-full">
            { page.title }
          </span>
        </div>
      </div>
      <Button
        className="absolute -left-7 top-0 text-rose-400 z-1 transition-all group-hover:-left-1.5"
        variant="link"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(index)
        }}
      >
        <XCircle className="w-4 h-4" />
      </Button>
    </div>
  )
}
