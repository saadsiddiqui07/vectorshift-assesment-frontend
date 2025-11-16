// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '12px 16px', backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.7)', borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='branch' label='Branch' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='httpRequest' label='HTTP' />
                <DraggableNode type='collector' label='Collector' />
                <DraggableNode type='customOutput' label='Output' />
            </div>
        </div>
    );
};
