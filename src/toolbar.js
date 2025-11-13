// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
