import { useSensor, useSensors, PointerSensor, DndContext, rectIntersection, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useBuilderStore } from '../src/store/useBuilderStore';
import { useState } from 'react';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Inspector from './components/Inspector';


export default function App() {

  const slots = useBuilderStore(s => s.slots)
  const addElementToSlot = useBuilderStore(s => s.addElementToSlot)
  const moveElementWithinSlot = useBuilderStore(s => s.moveElementWithinSlot)
  const [dragData, setDragData] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activateConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )
  const handleDragStart = (event) => {
    setDragData(event.active.data.current)
  }

  const handleDragEnd = (event) => {
    const { over, active } = event
    if (!over) { setDragData(null); return }

    const overSlotId = over.data?.current?.slotId || over.id
    const data = active.data.current

    //from palette -> add new Element
    if (data?.from === 'palette') {
      addElementToSlot(overSlotId, data.type)
      setDragData(null)
      return
    }

    //Reorder within same slot
    if (data?.from === 'slot') {
      const fromSlot = data.slotId
      const fromIndex = data.index
      if (fromSlot === overSlotId) {
        //fallback to end
        const toIndex = (typeof over.data?.current?.index === 'number') ? over.data.current.index : (slots[overSlotId]?.length ?? 0) - 1
        moveElementWithinSlot(overSlotId, fromIndex, toIndex)
      }
    }
    setDragData(null)
  }

  return (
    <div className='app'>
      <Toolbar />
      <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className='layout'>
          <Sidebar />
          <Canvas dragData={dragData} />
          <Inspector />
        </div>
      </DndContext>
    </div>
  )
}