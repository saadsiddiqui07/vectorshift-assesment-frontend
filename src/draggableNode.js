// draggableNode.js
import { PALETTE } from './constants';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '96px', 
          height: '52px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${PALETTE.darkBg} 0%, ${PALETTE.panelDark} 100%)`,
          border: `1px solid ${PALETTE.borderSlate}`,
          boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
          justifyContent: 'center', 
          flexDirection: 'column'
        }} 
        draggable
      >
          <span style={{ color: PALETTE.textLight, fontWeight: 600, fontSize: 12 }}>{label}</span>
      </div>
    );
  };
  