import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { useBuilderStore } from '../store/useBuilderStore';
import { CSS } from '@dnd-kit/utilities';
import ElementRenderer from './ElementRenderer';

function SortableItem ({ element, index, slotId }) {
  const  {attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: element.id, data: { from: 'slot', slotId, index } })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style= {style} {...attributes} {...listeners}>
      <ElementRenderer element= {element} slotId= {slotId} />
    </div>
  )
}

export default function TemplateSlot({ slot }) {
  const { setNodeRef, isOver } = useDroppable({ id: slot.id, data: {slotId: slot.id } })
  const elements = useBuilderStore(s => s.slots[slot.id] || [])
  const clearSelection = useBuilderStore(s => s.clearSelection)

  const gridStyle = slot.columns === 2 ? { display: 'grid', gridTemplateColumns: '1fr 1fr',gap: 10} : {}

  return (
    <div className="slot" ref={setNodeRef} style={{ background: isOver ? '#0f1a30' : undefined }} onClick={(e) => {
      if (e.target === e.currentTarget) clearSelection() 
    }}>
      <div className="slot-label">{slot.label}</div>
      <div className="slot-inner" style={gridStyle}>
        <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
          {elements.map((el, i) => (
            <SortableItem key={el.id} element={el} index={i} slotId={slot.id} />
          ))}
        </SortableContext>
      </div>
      {elements.length === 0 && <div className="hint">Drop elements here</div>}
    </div>
  )
}