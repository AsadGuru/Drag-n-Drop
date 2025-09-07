
import {useBuilderStore } from '../store/useBuilderStore';
import { TEMPLATES } from '../constants/templates';
import TemplateSlot from './TemplateSlot';
import { DragOverlay } from '@dnd-kit/core';


export default function Canvas ({dragData}) {
  const templateId = useBuilderStore(s => s.templateId)
  const device = useBuilderStore(s => s.device)
  const tpl = TEMPLATES.find(t => t.id === templateId)
  const canvasWidth = device === 'desktop' ? '1000px' : device === 'tablet' ? '800px' : '420px'


  return (
    <div className="canvas-wrap">
      <div className="canvas" style={{ '--canvas-width': canvasWidth }}><div className="template-grid">
            {tpl.slots.map(slot => (
              <TemplateSlot key={slot.id} slot={slot} />
            ))}
          </div>

          <DragOverlay>
            {dragData?.from === 'palette' && (
              <div className="item">
                <div style={{ opacity: 0.8 }}>New {dragData.type}</div>
              </div>
            )}
          </DragOverlay>
        <div className="responsive-note">Canvas Width: {canvasWidth}</div>
      </div>
    </div>
  )
}