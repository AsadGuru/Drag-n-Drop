import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { newId } from '../utils/id';
import { TEMPLATES } from '../constants/templates';

const initialTemplate = TEMPLATES[0]

const defaultElementProps = (type) => {
  switch (type) {
    case 'text':
      return { text: 'Double-click to edit me', align: 'left', color: '#e5e7eb', size: '16' }
    case 'image':
      return { src: 'https://picsum.photos/800/400', alt: 'Placeholder', width:'100%', radius:'10'}
    case 'button':
      return { label: 'Click Me', href: '#', varient: 'primary'}
    default:
      return {}
  }
}

const emptySlots = (templateId) => {
  const tpl = TEMPLATES.find(t => t.id === templateId) || initialTemplate;
  const map = {};
  tpl.slots.forEach(s => { map[s.id] = []; });
  return map;
}
export const useBuilderStore = create(
  persist(
    (set, get) => ({
      templateId: initialTemplate.id,
      slots: emptySlots(initialTemplate.id),
      selectedElementId: null,
      device: 'desktop',

      setTemplate: (templateId) => set({
        templateId,
        slots: emptySlots(templateId),
        selectedElementId: null
      }),

      addElementToSlot: ( slotId, type ) => {
        const id = newId('el');
        const element = { id, type, props: defaultElementProps(type) };
        const { slots } = get();
        set({
          slots: {...slots, [slotId]: [...(slots[slotId] || []), element] },
          selectedElementId: id
        })
      },

      moveElementWithinSlot: (slotId, fromIndex, toIndex) => {
        const { slots } = get()
        const arr = [...(slots[slotId] || [])]
        const [moved] = arr.splice(fromIndex, 1)
        arr.splice(toIndex, 0, moved)
        set({
          slots: {...slots, [slotId] : arr}
        })
      },

      removeElement: (slotId, elementId) => {
        const { slots, selectedElementId } = get()
        const arr = (slots[slotId] || []).filter(el => el.id !== elementId)
        set({
          slots: {...slots, [slotId]: arr},
          selectedElementId: selectedElementId === elementId ? null : selectedElementId
        })
      },

      updateElementProps: (elementId, patch) => {
        const { slots } = get()
        const newSlots = {}
        for(const sid in slots) {
          newSlots[sid] = (slots[sid] || []).map(el => el.id === elementId ? {...el, props: {...el.props, ...patch}} : el)
        }
        set({
          slots: newSlots
        })
      },

      selectElement: (elementId) => set({
        selectedElementId: elementId
      }),
      clearSelection: () => set({
        selectedElementId: null
      }),
      setDevice: (device) => set({ device })
    }),
    { name: 'builder-state' }
  )
)