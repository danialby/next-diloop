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
  IconComponent: React.ComponentType<{ size: number }>
  onNavigate: (index: number) => void
  onDelete: (index: number) => void
}

export function PageCard({
  page,
  index,
  className,
  IconComponent,
  onNavigate,
  onDelete,
}: PageCardProps) {
  return (
    <div
      key={page.id}
      className={className}
      onClick={() => onNavigate(index)}
    >
      <div className="max-w-full">
        <div className="flex flex-col gap-1 items-start">
          <IconComponent size={18} />
          <span className="text-xs text-gray-600 truncate max-w-full">
            {'question' in page
              ? page.question
              : 'title' in page
                ? page.title
                : page.type === 'quiz'
                  ? 'سوال آزمون'
                  : ''}
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
