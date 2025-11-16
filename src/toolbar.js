// toolbar.js

import { NODES } from './constants';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '12px 16px', backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.7)', borderBottom: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
                <DraggableNode type='customInput' label={NODES.CUSTOM_INPUT} />
                <DraggableNode type='llm' label={NODES.LLM} />
                <DraggableNode type='text' label={NODES.TEXT} />
                <DraggableNode type='math' label={NODES.MATH} />
                <DraggableNode type='branch' label={NODES.BRANCH} />
                <DraggableNode type='delay' label={NODES.DELAY} />
                <DraggableNode type='httpRequest' label={NODES.HTTP_REQUEST} />
                <DraggableNode type='collector' label={NODES.COLLECTOR} />
                <DraggableNode type='customOutput' label={NODES.CUSTOM_OUTPUT} />
            </div>
        </div>
    );
};
