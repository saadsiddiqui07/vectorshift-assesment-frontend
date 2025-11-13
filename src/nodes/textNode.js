import { Position } from 'reactflow';
import { createNodeComponent } from './common/baseNode';

export const TextNode = createNodeComponent({
  title: 'Text',
  badge: 'Transform',
  description: 'Combine variables into a static or templated string.',
  headerAccent: '#F59E0B',
  fields: [
    {
      key: 'text',
      label: 'Template',
      inputType: 'textarea',
      defaultValue: ({ data }) => data?.text || '{{input}}',
      helperText: 'Supports moustache-style variables, e.g. {{input}}.',
    },
    {
      key: 'trimWhitespace',
      label: 'Trim whitespace',
      inputType: 'checkbox',
      defaultValue: ({ data }) => Boolean(data?.trimWhitespace),
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
