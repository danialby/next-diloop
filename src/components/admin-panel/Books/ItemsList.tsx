import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Page } from '@/types/bookEditorTypes'
import { DraggableItem } from './DraggableItem'

interface ItemsListProps {
    page: Page
    expandedItems: string[]
    onItemChange: (itemId: string, field: string, value: any) => void
    onDeleteItem: (itemId: string) => void
    onDragEnd: (result: any) => void
    setExpandedItems: (items: string[]) => void
}

export const ItemsList = ({
                              page,
                              expandedItems,
                              onItemChange,
                              onDeleteItem,
                              onDragEnd,
                              setExpandedItems,
                          }: ItemsListProps) => {
    const toggleItemExpansion = (itemId: string) => {
        setExpandedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        )
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="items">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {page.items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps}>
                                        <DraggableItem
                                            item={item}
                                            index={index}
                                            isExpanded={expandedItems.includes(item.id)}
                                            onItemChange={onItemChange}
                                            onDelete={() => onDeleteItem(item.id)}
                                            onExpandChange={(expanded) => toggleItemExpansion(item.id)}
                                            dragHandleProps={provided.dragHandleProps}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}