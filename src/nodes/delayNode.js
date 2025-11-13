import { Position } from 'reactflow';
import { createNodeComponent } from './nodeFactory';

export const DelayNode = createNodeComponent({
  title: 'Delay',
  badge: 'Control',
  description: 'Pause execution to throttle downstream calls.',
  headerAccent: '#8B5CF6',
  fields: [
    {
      key: 'duration',
      label: 'Duration',
      inputType: 'number',
      defaultValue: ({ data }) => data?.duration || 5,
      inputProps: {
        min: 1,
        step: 1,
      },
      helperText: 'Specify the wait length before continuing.',
    },
    {
      key: 'unit',
      label: 'Time unit',
      inputType: 'select',
      defaultValue: ({ data }) => data?.unit || 'seconds',
      options: [
        { label: 'Seconds', value: 'seconds' },
        { label: 'Minutes', value: 'minutes' },
        { label: 'Hours', value: 'hours' },
      ],
    },
    {
      key: 'jitter',
      label: 'Enable jitter',
      inputType: 'checkbox',
      defaultValue: ({ data }) => Boolean(data?.jitter),
      helperText: 'Randomize wait ±10% to avoid thundering herd.',
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
      idSuffix: 'output',
      style: { top: '50%' },
    },
  ],
});

