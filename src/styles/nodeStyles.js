import { PALETTE } from '../constants';

export const baseContainerStyle = {
  width: 260,
  minHeight: 140,
  borderRadius: 14,
  border: `1px solid ${PALETTE.borderLight}`,
  background: 'linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)',
  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)',
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: '#0F172A',
};

export const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
};

export const titleStyle = {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '0.01em',
  textTransform: 'uppercase',
  color: '#1E293B',
};

export const badgeStyle = {
  padding: '2px 6px',
  borderRadius: 999,
  background: 'rgba(37, 99, 235, 0.10)',
  color: PALETTE.bluePrimary,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.04em',
};

export const descriptionStyle = {
  fontSize: 12,
  lineHeight: 1.4,
  color: '#475569',
};

export const fieldWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

export const labelStyle = {
  fontSize: 12,
  fontWeight: 500,
  color: '#1E293B',
};

export const helperTextStyle = {
  fontSize: 11,
  color: '#64748B',
};

export const inputBaseStyle = {
  borderRadius: 8,
  border: '1px solid #CBD5F5',
  padding: '6px 8px',
  fontSize: 12,
  lineHeight: 1.4,
  color: '#0F172A',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  background: '#F8FAFC',
};

export const textareaStyle = {
  ...inputBaseStyle,
  minHeight: 64,
  resize: 'vertical',
};

export const checkboxStyle = {
  width: 14,
  height: 14,
};

export const DARK_STYLES = {
  baseContainerStyle: {
    width: 260,
    minHeight: 140,
    borderRadius: 14,
    border: `1px solid ${PALETTE.borderDark}`,
    background: `linear-gradient(135deg, ${PALETTE.darkBg} 0%, ${PALETTE.panelDark} 100%)`,
    boxShadow: '0 12px 24px rgba(0,0,0,0.35)',
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: PALETTE.textLight,
  },
  headerStyle,
  titleStyle: { ...titleStyle, color: PALETTE.textLight },
  badgeStyle: { ...badgeStyle },
  descriptionStyle: { ...descriptionStyle, color: PALETTE.mutedText },
  fieldWrapperStyle,
  labelStyle: { ...labelStyle, color: PALETTE.textLight },
  helperTextStyle: { ...helperTextStyle, color: PALETTE.mutedText },
  inputBaseStyle: {
    borderRadius: 10,
    border: `1px solid ${PALETTE.borderSlate}`,
    padding: '6px 8px',
    fontSize: 12,
    lineHeight: 1.4,
    color: PALETTE.textLight,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    background: PALETTE.darkBg,
  },
  textareaStyle: {
    borderRadius: 10,
    border: `1px solid ${PALETTE.borderSlate}`,
    padding: '6px 8px',
    fontSize: 12,
    lineHeight: 1.4,
    color: PALETTE.textLight,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    background: PALETTE.darkBg,
    minHeight: 64,
    resize: 'vertical',
  },
  checkboxStyle,
  defaultHandleStyle: {
    width: 10,
    height: 10,
    backgroundColor: PALETTE.blueAccent,
    border: `2px solid ${PALETTE.darkBg}`,
    boxShadow: '0 0 8px rgba(96,165,250,0.45)',
  },
};

export const defaultHandleStyle = {
  width: 10,
  height: 10,
  backgroundColor: PALETTE.bluePrimary,
  border: `2px solid ${PALETTE.borderLight}`,
  boxShadow: '0 0 0 2px rgba(37,99,235,0.15)',
};



export const LIGHT_STYLES = {
  baseContainerStyle,
  headerStyle,
  titleStyle,
  badgeStyle,
  descriptionStyle,
  fieldWrapperStyle,
  labelStyle,
  helperTextStyle,
  inputBaseStyle,
  textareaStyle,
  checkboxStyle,
  defaultHandleStyle,
};

