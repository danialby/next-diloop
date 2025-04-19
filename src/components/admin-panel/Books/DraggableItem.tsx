import { PageItem } from '@/types/bookEditorTypes'
import { PAGE_ITEM_TYPES, COLOR_CLASSES } from '@/types/bookEditorTypes'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {BookOpenText, GripVertical, Trash2} from 'lucide-react'
import { PageItemEditor } from '@/components/admin-panel/Books/PageItemEditor'
import {clsx} from "clsx";

interface DraggableItemProps {
    item: PageItem
    index: number
    isExpanded: boolean
    onItemChange: (field: string, value: any) => void
    onDelete: () => void
    onExpandChange: (expanded: boolean) => void
    dragHandleProps: any
}

export const DraggableItem = ({
                                  item,
                                  index,
                                  isExpanded,
                                  onItemChange,
                                  onDelete,
                                  onExpandChange,
                                  dragHandleProps,
                              }: DraggableItemProps) => {
    const config = PAGE_ITEM_TYPES.find(t => t.type === item.type)
    const Icon = config?.icon || BookOpenText

    return (
        <div className="border rounded-lg overflow-hidden">
            <Accordion
                collapsible
                type="single"
                value={isExpanded ? [item.id] : []}
                onValueChange={() => onExpandChange(!isExpanded)}
            >
                <AccordionItem value={item.id}>
                    <div className={clsx(
                        'flex items-center justify-between !bg-gray-50',
                        COLOR_CLASSES[config?.color || 'blue'].pageItem,
                    )}>
                        <AccordionTrigger className="px-2 py-0 hover:no-underline flex-1 w-full">
                            <button
                                {...dragHandleProps}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <GripVertical className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-2 w-full">
                                <Icon className="w-4 h-4" />
                                <span className="font-medium text-xs">
                  {config?.label}
                                    {item.type === 'heading' && `: ${(item as HeadingItem).text}`}
                </span>
                            </div>
                        </AccordionTrigger>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={onDelete}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                    <AccordionContent>
                        <PageItemEditor item={item} onItemChange={onItemChange} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}