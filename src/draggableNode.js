// draggableNode.js

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
          background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          border: '1px solid #E5E7EB',
          boxShadow: '0 6px 16px rgba(15,23,42,0.06)',
          justifyContent: 'center', 
          flexDirection: 'column'
        }} 
        draggable
      >
          <span style={{ color: '#0F172A', fontWeight: 600, fontSize: 12 }}>{label}</span>
      </div>
    );
  };
  