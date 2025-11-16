// submit.js
import { useCallback } from 'react';
import { useStore } from './store';
import { API_BASE_URL, PALETTE } from './constants';

export const SubmitButton = () => {
    const nodes = useStore((s) => s.nodes);
    const edges = useStore((s) => s.edges);

    const onSubmit = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/pipelines/parse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });
            const data = await res.json();
            alert(`Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag ? 'Yes' : 'No'}`);
        } catch (err) {
            alert('Failed to submit pipeline');
            console.error(err);
        }
    }, [nodes, edges]);

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px'}}>
            <button
                type="button"
                onClick={onSubmit}
                style={{
                    padding: '16px',
                    borderRadius:8,
                    border: '1px solid #D1D5DB',
                    background: PALETTE.bluePrimary,
                    boxShadow: '0 6px 16px rgba(15,23,42,0.06)',
                    color: PALETTE.textLight,
                    fontWeight: 600,
                    cursor: 'pointer'
                }}
            >
                Submit
            </button>
        </div>
    );
}
