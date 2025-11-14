import { Position } from 'reactflow';
import { createNodeComponent } from './common/baseNode';

export const TextNode = createNodeComponent({
  title: 'Text',
  badge: 'Transform',
  description: 'Combine variables into a static or templated string.',
  headerAccent: '#F59E0B',
  style: ({ values }) => {
    const text = values?.text ?? '';
    const lines = String(text).split('\n');
    const longest = lines.reduce((m, l) => (l.length > m ? l.length : m), 0);
    const charWidth = 7;
    const minWidth = 260;
    const maxWidth = 360;
    const padding = 24;
    const width = Math.min(
      maxWidth,
      Math.max(minWidth, padding + longest * charWidth)
    );
    return { width };
  },
  fields: [
    {
      key: 'text',
      label: 'Template',
      inputType: 'textarea',
      defaultValue: ({ data }) => data?.text || '{{input}}',
      inputProps: { autoResize: true },
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
