import { useBuilderStore } from "../store/useBuilderStore";

export default function ElementRenderer({ element, slotId }) {
  const { id, type, props } = element
  const selectedId = useBuilderStore(s => s.selectedElementId)
  const selectElement = useBuilderStore(s => s.selectElement)
  const removeElement = useBuilderStore(s => s.removeElement)

  const selected = selectedId === id

  return (
    <div className={`item ${selected ? 'selected' : ''}`} onClick={(e) => { e.stopPropagation(); selectElement(id) }}>
      <div className="item-actions" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn" onClick={() => removeElement(slotId, id)}>X</button>
      </div>
      {type === 'text' && (
        <div style={{ textAlign: props.align, color: props.color, fontSize: `${props.size}px`}}>
          {props.text}
        </div>
      )}
      {type === 'image' && (
        <img src={props.src} alt={props.alt} style={{
          width: props.width,
          borderRadius: `${props.radius}px`,
          display: 'block'
        }} />
      )}
      {type === 'button' && (
        <a href={props.href} style={{
          display: 'inline-block',
          background: props.varient === 'primary' ? '#3b82f8' : '#111827',
          color: props.varient === 'primary' ? '#fff' : '#e5e7eb',
          border: '1px solid #334155',
          padding: '10px 14px',
          borderRadius: 8,
          textDecoration: 'none'
        }}>{props.label}</a>
      )}
    </div>
  )
}