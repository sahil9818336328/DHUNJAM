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
      {/* FEW PROPS TO MAKE IT DYNAMIC */}
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
      {/* IF ICON RENDER ICON ON THE RIGHT */}
      {icon && (
        <span className='eye-icon' onClick={onClick}>
          {icon}
        </span>
      )}
    </div>
  )
}
export default FormRow
