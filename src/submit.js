// submit.js
import { useCallback } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((s) => s.nodes);
    const edges = useStore((s) => s.edges);

    const onSubmit = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:8000/pipelines/parse', {
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
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="button" onClick={onSubmit}>Submit</button>
        </div>
    );
}
