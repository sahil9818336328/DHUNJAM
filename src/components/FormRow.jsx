/* eslint-disable react/prop-types */
const FormRow = ({
  type,
  name,
  min,
  onChange,
  placeholder,
  icon,
  onClick,
  showPassword,
  className = '',
  disabled = false,
  value,
}) => {
  // RE-USABLE COMPONENT
  return (
    <div className={`form-row  ${icon ? 'icon-container' : ''}`}>
      <input
        type={showPassword ? 'text' : type}
        id={name}
        name={name}
        className={`form-input ${className ? className : ''}`}
        onChange={onChange}
        required
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        min={min}
      />
      {icon && (
        <span className='eye-icon' onClick={onClick}>
          {icon}
        </span>
      )}
    </div>
  )
}
export default FormRow
