import { Position } from 'reactflow';
import { createNodeComponent } from './nodeFactory';

export const InputNode = createNodeComponent({
  title: 'Input',
  badge: 'Source',
  description: 'Expose variables that start your pipeline.',
  headerAccent: '#0EA5E9',
  fields: [
    {
      key: 'inputName',
      label: 'Name',
      inputType: 'text',
      defaultValue: ({ id, data }) =>
        data?.inputName || id.replace('customInput-', 'input_'),
      helperText: 'Unique identifier surfaced to downstream nodes.',
    },
    {
      key: 'inputType',
      label: 'Type',
      inputType: 'select',
      defaultValue: ({ data }) => data?.inputType || 'Text',
      options: [
        { label: 'Text', value: 'Text' },
        { label: 'File', value: 'File' },
        { label: 'Number', value: 'Number' },
      ],
    },
  ],
  handles: [
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'value',
      style: { top: '50%' },
    },
  ],
});
