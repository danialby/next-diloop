import { PAGE_ITEM_TYPES, COLOR_CLASSES } from '@/types/bookEditorTypes'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { clsx } from 'clsx'

interface PageItemButtonsProps {
    onAddItem: (type: string) => void
}

export const PageItemButtons = ({ onAddItem }: PageItemButtonsProps) => {
    return (
        <Card className="p-4">
            <div className="grid grid-cols-4 gap-2">
                {PAGE_ITEM_TYPES.map(({ type, icon: Icon, color, label }) => (
                    <Button
                        key={type}
                        variant="outline"
                        className={clsx(
                            'h-14 flex flex-col gap-1 text-xs',
                            COLOR_CLASSES[color].button,
                        )}
                        onClick={() => onAddItem(type)}
                    >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                    </Button>
                ))}
            </div>
        </Card>
    )
}