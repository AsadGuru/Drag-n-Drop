import { useDraggable } from '@dnd-kit/core';
import { ELEMENT_TYPES } from '../constants/templates';

function PaletteItem({ type, label }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-${type}`,
    data: { from: 'palette', type }
  })

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className='palette-item'>
      <div style={{ fontWeight: 600 }}>{label}</div>
      <small>{type}</small>
    </div>
  )
}

export default function Sidebar () {
  return (
    <aside className='sidebar'>
      <div className='section-title'>Elements</div>
      <div className='palette'>
        {ELEMENT_TYPES.map(e => (
          <PaletteItem key={e.type} type={e.type} label={e.label} />
        ))}
      </div>

      <hr className='sep' />

      <div className='section-title'>Tips</div>
      <div className='hint'>
        - Drag from the palette and drop into any slot.<br />
        - Click an element to edit its properties.<br />
        - Use the preview toggles for responsive sizes
      </div>
    </aside>
  )
}