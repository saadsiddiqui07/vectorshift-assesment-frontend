import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
// Store
import { useStore } from '../../store';
// Styles
import {
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
} from '../../styles/nodeStyles';

const ensureOptions = (options = []) =>
  options.map((option) =>
    typeof option === 'string'
      ? { label: option, value: option }
      : option
  );

const initializeValues = (fields, context) => {
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

  const { id: explicitId, idSuffix } = handleConfig;

  if (typeof explicitId === 'function') {
    return explicitId(context);
  }

  if (explicitId) {
    return explicitId;
  }

  if (idSuffix) {
    return `${id}-${idSuffix}`;
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

const NodeTemplate = memo(({ definition, id, data }) => {
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

  const updateNodeField = useStore((state) => state.updateNodeField);

  const [values, setValues] = useState(() =>
    initializeValues(fields, { id, data })
  );

  useEffect(() => {
    setValues((prev) => {
      const nextValues = { ...prev };
      let hasChanges = false;

      fields.forEach((field) => {
        if (!field?.key) {
          return;
        }

        const nextValue = data?.[field.key];
        if (nextValue !== undefined && nextValue !== prev[field.key]) {
          nextValues[field.key] = nextValue;
          hasChanges = true;
        }
      });

      return hasChanges ? nextValues : prev;
    });
  }, [data, fields]);

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
  }, [data, fields, id, updateNodeField, values]);

  const handleFieldChange = useCallback(
    (field, nextValue) => {
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
    },
    [id, updateNodeField]
  );

  const context = useMemo(
    () => ({
      id,
      data,
      values,
    }),
    [id, data, values]
  );

  const computedStyle = useMemo(
    () => (typeof style === 'function' ? style({ id, data, values }) : style),
    [style, id, data, values]
  );

  return (
    <div style={mergeStyles(baseContainerStyle, computedStyle)}>
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

      <div
        style={mergeStyles(headerStyle, {
          borderLeft: `3px solid ${headerAccent}`,
          paddingLeft: 10,
        })}
      >
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
});

NodeTemplate.displayName = 'NodeTemplate';

export const createNodeComponent = (definition = {}) => {
  const NodeComponent = (props) => (
    <NodeTemplate {...props} definition={definition} />
  );

  NodeComponent.displayName = `${(definition.title || 'Node')
    .replace(/\s+/g, '')
    .trim()}Node`;

  return NodeComponent;
};

export const { Left: HandleLeft, Right: HandleRight, Top: HandleTop, Bottom: HandleBottom } =
  Position;
