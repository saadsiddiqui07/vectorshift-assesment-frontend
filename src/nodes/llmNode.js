import { Position } from 'reactflow';
import { createNodeComponent } from './common/baseNode';

export const LLMNode = createNodeComponent({
  title: 'LLM',
  badge: 'Model',
  description: 'Invoke a large language model with templated prompts.',
  headerAccent: '#6366F1',
  fields: [
    {
      key: 'model',
      label: 'Provider',
      inputType: 'select',
      defaultValue: ({ data }) => data?.model || 'gpt-4',
      options: [
        { label: 'GPT-4', value: 'gpt-4' },
        { label: 'GPT-4o Mini', value: 'gpt-4o-mini' },
        { label: 'Claude 3 Haiku', value: 'claude-3-haiku' },
      ],
    },
    {
      key: 'temperature',
      label: 'Temperature',
      inputType: 'number',
      defaultValue: ({ data }) =>
        data?.temperature !== undefined ? data.temperature : 0.2,
      inputProps: {
        min: 0,
        max: 1,
        step: 0.1,
      },
      helperText: 'Higher values increase creativity. Range 0–1.',
    },
    {
      key: 'maxTokens',
      label: 'Max tokens',
      inputType: 'number',
      defaultValue: ({ data }) => data?.maxTokens || 1024,
      inputProps: {
        min: 64,
        step: 64,
      },
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'system',
      style: { top: '30%' },
    },
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'prompt',
      style: { top: '55%' },
    },
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'response',
      style: { top: '50%' },
    },
  ],
});
