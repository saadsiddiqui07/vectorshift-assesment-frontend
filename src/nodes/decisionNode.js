import { Position } from 'reactflow';
import { createNodeComponent } from './nodeFactory';

export const DecisionNode = createNodeComponent({
  title: 'Branch',
  badge: 'Logic',
  description: 'Evaluate a condition and split the flow.',
  headerAccent: '#10B981',
  fields: [
    {
      key: 'expression',
      label: 'Condition',
      inputType: 'textarea',
      defaultValue: ({ data }) =>
        data?.expression || '{{$input.score}} > 0.7',
      helperText: 'Use JavaScript-style expressions with pipeline variables.',
    },
    {
      key: 'fallback',
      label: 'Fallback value',
      inputType: 'text',
      defaultValue: ({ data }) => data?.fallback || 'false',
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'input',
      style: { top: '50%' },
    },
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'true',
      style: { top: '35%' },
    },
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'false',
      style: { top: '65%' },
    },
  ],
});

