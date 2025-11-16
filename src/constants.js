// frontend/src/constants.js
export const API_BASE_URL = 'http://localhost:8000';

export const ENDPOINTS = {
  PIPELINE_PARSE: '/pipelines/parse',
};

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const LABELS = {
  SUBMIT: 'Submit',
  TOOLS: 'Tools',
  NODES: 'Nodes',
  EDGES: 'Edges',
  IS_DAG: 'Is DAG',
  YES: 'Yes',
  NO: 'No',
};

export const NODES = {
  CUSTOM_INPUT: 'Input',
  LLM: 'LLM',
  TEXT: 'Text',
  MATH: 'Math',
  BRANCH: 'Branch',
  DELAY: 'Delay',
  HTTP_REQUEST: 'HTTP',
  COLLECTOR: 'Collector',
  CUSTOM_OUTPUT: 'Output',
};

export const PALETTE = {
  darkBg: '#0B1220',
  panelDark: '#111827',
  lightBg: '#FFFFFF',
  textLight: '#E5E7EB',
  textDark: '#111827',
  mutedText: '#94A3B8',
  borderDark: '#1F2937',
  borderSlate: '#334155',
  borderLight: '#EFF6FF',
  gridDark: '#1F2937',
  blueAccent: '#5B8DEF',
  bluePrimary: '#2563EB',
};