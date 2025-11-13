import { useEffect, useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const baseContainerStyle = {
  width: 260,
  minHeight: 140,
  borderRadius: 12,
  border: '1px solid #E2E8F0',
  background: '#FFFFFF',
  boxShadow: '0 10px 20px rgba(15, 23, 42, 0.08)',
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: '#0F172A',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
};

const titleStyle = {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '0.01em',
  textTransform: 'uppercase',
  color: '#1E293B',
};

const badgeStyle = {
  padding: '2px 6px',
  borderRadius: 999,
  background: 'rgba(37, 99, 235, 0.12)',
  color: '#1D4ED8',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.04em',
};

const descriptionStyle = {
  fontSize: 12,
  lineHeight: 1.4,
  color: '#475569',
};

const fieldWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 500,
  color: '#1E293B',
};

const helperTextStyle = {
  fontSize: 11,
  color: '#64748B',
};

const inputBaseStyle = {
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

const textareaStyle = {
  ...inputBaseStyle,
  minHeight: 64,
  resize: 'vertical',
};

const checkboxStyle = {
  width: 14,
  height: 14,
};

const defaultHandleStyle = {
  width: 10,
  height: 10,
  background: '#2563EB',
  border: '2px solid #EFF6FF',
};

const ensureOptions = (options = []) =>
  options.map((option) =>
    typeof option === 'string'
      ? { label: option, value: option }
      : option
  );

const initializeValues = (fields = [], context) => {
  const { id, data } = context;
  return fields.reduce((acc, field) => {
    const {
      key,
      defaultValue,
      defaultFromId,
    } = field;

    if (!key) {
      return acc;
    }

    const fieldDefault =
      data?.[key] ??
      (typeof defaultValue === 'function'
        ? defaultValue(context)
        : defaultValue);

    if (fieldDefault !== undefined) {
      acc[key] = fieldDefault;
      return acc;
    }

    if (typeof defaultFromId === 'function') {
      acc[key] = defaultFromId(id, context);
      return acc;
    }

    if (typeof defaultFromId === 'string') {
      acc[key] = id.replace(defaultFromId, '');
      return acc;
    }

    acc[key] = '';
    return acc;
  }, {});
};

const handleIdFor = (handleConfig, context) => {
  const { id } = context;

  if (typeof handleConfig.id === 'function') {
    return handleConfig.id(context);
  }

  if (handleConfig.id) {
    return handleConfig.id;
  }

  if (handleConfig.idSuffix) {
    return `${id}-${handleConfig.idSuffix}`;
  }

  return id;
};

const mergeStyles = (...styles) =>
  styles
    .filter(Boolean)
    .reduce((acc, style) => ({ ...acc, ...style }), {});

const renderDefaultField = (field, value, onChange) => {
  const {
    inputType = 'text',
    options,
    placeholder,
    inputProps,
  } = field;

  if (inputType === 'select') {
    return (
      <select
        style={inputBaseStyle}
        value={
          value ??
          ensureOptions(options)[0]?.value ??
          ''
        }
        onChange={(event) => onChange(event.target.value)}
        {...inputProps}
      >
        {ensureOptions(options).map(({ label, value: optionValue }) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
    );
  }

  if (inputType === 'textarea') {
    return (
      <textarea
        style={textareaStyle}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        {...inputProps}
      />
    );
  }

  if (inputType === 'checkbox') {
    return (
      <input
        type="checkbox"
        style={checkboxStyle}
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
        {...inputProps}
      />
    );
  }

  if (inputType === 'number') {
    return (
      <input
        type="number"
        style={inputBaseStyle}
        value={value ?? ''}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue === '' ? '' : Number(nextValue));
        }}
        placeholder={placeholder}
        {...inputProps}
      />
    );
  }

  return (
    <input
      type={inputType}
      style={inputBaseStyle}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      {...inputProps}
    />
  );
};

export const createNodeComponent = (definition = {}) => {
  const {
    title = 'Node',
    badge,
    description,
    fields = [],
    handles = [],
    style,
    headerAccent = '#2563EB',
    body,
    footer,
  } = definition;

  const component = ({ id, data }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const [values, setValues] = useState(() =>
      initializeValues(fields, { id, data })
    );

    const context = useMemo(
      () => ({
        id,
        data,
        values,
      }),
      [id, data, values]
    );

    useEffect(() => {
      fields.forEach((field) => {
        if (!field?.key) {
          return;
        }

        const currentDataValue = data?.[field.key];
        const currentStateValue = values[field.key];
        if (
          currentDataValue !== undefined &&
          currentDataValue !== currentStateValue
        ) {
          setValues((prev) => ({
            ...prev,
            [field.key]: currentDataValue,
          }));
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
      fields.forEach((field) => {
        if (!field?.key || field.persist === false) {
          return;
        }

        if (data?.[field.key] === undefined) {
          const nextValue = values[field.key];
          if (nextValue !== undefined) {
            updateNodeField(id, field.key, nextValue);
          }
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFieldChange = (field, nextValue) => {
      if (!field?.key) {
        return;
      }

      setValues((prev) => ({
        ...prev,
        [field.key]: nextValue,
      }));

      if (field.persist === false) {
        return;
      }

      updateNodeField(id, field.key, nextValue);
    };

    return (
      <div style={mergeStyles(baseContainerStyle, style)}>
        {handles
          .filter((handle) => handle.position === Position.Left)
          .map((handle) => (
            <Handle
              key={`${handle.type}-${handleIdFor(handle, context)}-left`}
              type={handle.type}
              position={Position.Left}
              id={handleIdFor(handle, context)}
              style={mergeStyles(
                defaultHandleStyle,
                { left: -5 },
                handle.style
              )}
            />
          ))}

        <div style={mergeStyles(headerStyle, { borderLeft: `3px solid ${headerAccent}`, paddingLeft: 10 })}>
          <span style={titleStyle}>{title}</span>
          {badge ? <span style={badgeStyle}>{badge}</span> : null}
        </div>

        {description ? (
          <div style={descriptionStyle}>{description}</div>
        ) : null}

        {body ? body(context) : null}

        {fields.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {fields.map((field) => {
              const value = values[field.key];
              const onChange = (nextValue) =>
                handleFieldChange(field, nextValue);

              return (
                <div key={field.key} style={fieldWrapperStyle}>
                  {field.label ? (
                    <label style={labelStyle}>{field.label}</label>
                  ) : null}
                  {field.render
                    ? field.render({
                        context,
                        value,
                        onChange,
                        defaultRenderer: () =>
                          renderDefaultField(field, value, onChange),
                      })
                    : renderDefaultField(field, value, onChange)}
                  {field.helperText ? (
                    <span style={helperTextStyle}>{field.helperText}</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {footer ? footer(context) : null}

        {handles
          .filter((handle) => handle.position === Position.Right)
          .map((handle) => (
            <Handle
              key={`${handle.type}-${handleIdFor(handle, context)}-right`}
              type={handle.type}
              position={Position.Right}
              id={handleIdFor(handle, context)}
              style={mergeStyles(
                defaultHandleStyle,
                { right: -5 },
                handle.style
              )}
            />
          ))}

        {handles
          .filter(
            (handle) =>
              handle.position !== Position.Left &&
              handle.position !== Position.Right
          )
          .map((handle) => (
            <Handle
              key={`${handle.type}-${handleIdFor(handle, context)}-${handle.position}`}
              type={handle.type}
              position={handle.position}
              id={handleIdFor(handle, context)}
              style={mergeStyles(defaultHandleStyle, handle.style)}
            />
          ))}
      </div>
    );
  };

  component.displayName = `${title.replace(/\s+/g, '')}Node`;
  component.position = Position;

  return component;
};

export const { Left: HandleLeft, Right: HandleRight, Top: HandleTop, Bottom: HandleBottom } =
  Position;

