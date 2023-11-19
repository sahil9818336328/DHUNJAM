/* eslint-disable react/prop-types */
import FormRow from './FormRow'

const CustomSongRequest = ({
  customSongValue,
  disabled,
  setCustomSongValue,
  handleApiPayloadData,
}) => {
  return (
    <div className='questions'>
      <p className='single-question'>Custom song request amount-</p>
      <div className='song-request-amount'>
        {/* RE - USABLE COMPONENT */}
        <FormRow
          type='number'
          value={customSongValue}
          className={`center ${
            disabled || customSongValue < 99 ? 'disabled' : ''
          }`}
          // UPDATE CUSTOM SONG VALUE AND ALSO UPDATE API PAYLOAD DATA
          onChange={(e) => {
            setCustomSongValue(e.target.value)
            handleApiPayloadData(e)
          }}
          min={99}
          disabled={disabled}
          name='category_6'
        />
      </div>
    </div>
  )
}
export default CustomSongRequest
