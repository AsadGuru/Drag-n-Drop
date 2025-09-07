import { useBuilderStore } from '../store/useBuilderStore';
import { TEMPLATES } from '../constants/templates';

export default function Toolbar() {
  const templateId = useBuilderStore(s => s.templateId)
  const setTemplate = useBuilderStore(s => s.setTemplate)
  const device = useBuilderStore(s => s.device)
  const setDevice = useBuilderStore(s => s.setDevice)

  return (
    <div className='toolbar'>
      <div className='group'>
        <strong>Template:</strong>
        <select className="select" value={templateId} onChange={(e) => setTemplate(e.target.value)}>
          {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div className='group'>
        <strong>Preview:</strong>
        <button className={`btn ${device==='desktop'?'primary':''}`} onClick={() => setDevice('desktop')}>Desktop</button>
        <button className={`btn ${device==='tablet'?'primary':''}`} onClick={() => setDevice('tablet')}>Tablet</button>
        <button className={`btn ${device==='mobile'?'primary':''}`} onClick={() => setDevice('mobile')}>Mobile</button>
      </div>

      <div className='group' style={{ marginLeft: 'auto' }}>
        <button className='btn ghost' onClick={() => localStorage.removeItem('builder-state')}>Reset State</button>
        <button className='btn'>Export JSON</button>
      </div>
    </div>
  )
}