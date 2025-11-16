// draggableNode.js
import { useState } from 'react';
import { PALETTE } from './constants';

export const DraggableNode = ({ type, label }) => {
    const [hovered, setHovered] = useState(false);
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: 'grab',
          minWidth: '100px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '14px',
          background: `linear-gradient(135deg, ${PALETTE.lightBg} 0%, ${PALETTE.lightBg} 100%)`,
          boxShadow: hovered ? '0 10px 24px rgba(0,0,0,0.10)' : '0 6px 16px rgba(0,0,0,0.1)',
          justifyContent: 'center',
          flexDirection: 'column',
          transition: 'transform 140ms ease, box-shadow 160ms ease',
          transform: hovered ? 'translateY(-1px)' : 'translateY(0)'
        }} 
        draggable
      >
          <span style={{ color: PALETTE.textDark, fontWeight: 600, fontSize: 12 }}>{label}</span>
      </div>
    );
  };
  