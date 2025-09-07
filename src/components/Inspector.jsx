import { useBuilderStore } from "../store/useBuilderStore";


function useSelectedElement() {
  const slots = useBuilderStore(s => s.slots)
  const selectedId = useBuilderStore(s => s.selectedElementId)
  for (const sid in slots) {
    const match = (slots[sid] || []).find(el => el.id === selectedId)
    if (match) return match
  }
  return null
}

export default function Inspector() {
  const el = useSelectedElement()
  const update = useBuilderStore(s => s.updateElementProps)
  if (!el) {
    return (
      <aside className="inspector">
        <div className="section-title">Inspector</div>
        <div className="hint">Select an element to edit its properties.</div>
      </aside>
    )
  }

  const onChange = (patch) => update(el.id, patch)

  return (
    <aside className="inspector">
      <div className="section-title">Inspector - {el.type}</div>

      {el.type === 'text' && (
        <div className="form">
          <div className="field">
            <label>Text</label>
            <textarea className="textarea" value={el.props.text} onChange={(e) => onChange({ text: e.target.value })} />
          </div>
          <div className="row">
            <div className="field">
              <label>Assignment</label>
              <select className="select" value={el.props.align} onChange={(e) => onChange({ align: e.target.value })}>
                <option>Left</option>
                <option>Center</option>
                <option>Right</option>
              </select>
            </div>
            <div className="field">
              <label>Font Size (px)</label>
              <input type="number" className="input" value={el.props.size} onChange={(e) => onChange({ size: e.target.value })} />
            </div>
          </div>
          <div className="field">
            <label>Color</label>
            <input type="color" className="input" value={el.props.color} onChange={(e) => onChange({ color: e.target.value })} />
          </div>
        </div>
      )}

      {el.type === 'image' && (
        <div className="form">
          <div className="field">
            <label>Image URL</label>
            <input className="input" value={el.props.src} onChange={(e) => onChange({ src: e.target.value })} />
          </div>
          <div className="field">
            <label>Alt Text</label>
            <input className="input" value={el.props.alt} onChange={(e) => onChange({ alt: e.target.value })} />
          </div>
          <div className="row">
            <div className="field">
              <label>Width (e.g., 100%, 400px)</label>
              <input className="input" value={el.props.width} onChange={(e) => onChange({ width: e.target.value })} />
            </div>
            <div className="field">
              <label>Radius(px)</label>
              <input type="number" className="input" value={el.props.radius} onChange={(e) => onChange({ radius: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      {el.type === 'button' && (
        <div className="form">
          <div className="field">
            <label>Label</label>
            <input className="input" value={el.props.label} onChange={(e) => onChange({ label: e.target.value})} />
          </div>
          <div className="field">
            <label>Link (href)</label>
            <input className="input" value={el.props.href} onChange={(e) => onChange({ href: e.target.value})} />
          </div>
          <div className="field">
            <label>Varient</label>
            <select className="select" value={el.props.varient} onChange={(e) => onChange({ varient: e.target.value})}>
              <option value="primary">Primary</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>
        </div>
      )}
    </aside>
  )
}