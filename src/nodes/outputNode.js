import { Position } from 'reactflow';
import { createNodeComponent } from './nodeFactory';

export const OutputNode = createNodeComponent({
  title: 'Output',
  badge: 'Destination',
  description: 'Pin results you want to expose externally.',
  headerAccent: '#22C55E',
  fields: [
    {
      key: 'outputName',
      label: 'Alias',
      inputType: 'text',
      defaultValue: ({ id, data }) =>
        data?.outputName || id.replace('customOutput-', 'output_'),
      helperText: 'Readable label for this pipeline output.',
    },
    {
      key: 'outputType',
      label: 'Format',
      inputType: 'select',
      defaultValue: ({ data }) => data?.outputType || 'Text',
      options: [
        { label: 'Text', value: 'Text' },
        { label: 'Image', value: 'Image' },
        { label: 'JSON', value: 'JSON' },
      ],
    },
    {
      key: 'isPrimary',
      label: 'Mark as primary',
      inputType: 'checkbox',
      defaultValue: ({ data }) => Boolean(data?.isPrimary),
      helperText: 'Primary outputs surface first in API responses.',
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'value',
      style: { top: '50%' },
    },
  ],
});
