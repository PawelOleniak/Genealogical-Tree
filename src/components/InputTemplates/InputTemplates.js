import { InputWrapper } from './InputTemplatesCss';

export function Input({
  input,
  meta,
  fieldType = 'text',
  step,
  placeholder,
  initialValue,
  description,
  disabled,
  unit,
}) {
  return (
    <InputWrapper>
      <label>{description ? description : fieldType}</label>
      <div>
        <input
          {...input}
          step={step}
          disabled={disabled}
          initialvalue={initialValue}
          type={disabled ? 'clear' : fieldType}
          placeholder={placeholder ? placeholder : fieldType}
        />
        {unit}
      </div>
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </InputWrapper>
  );
}
export function Select({ input, meta, options, description, initialValue }) {
  return (
    <InputWrapper>
      <label>{description}</label>
      <select {...input} initialvalue={initialValue}>
        {options}
      </select>
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </InputWrapper>
  );
}
