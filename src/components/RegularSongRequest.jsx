/* eslint-disable react/prop-types */
import FormRow from './FormRow'

const RegularSongRequest = ({ disabled, regularSongValue, handleChange }) => {
  return (
    <div className='questions'>
      <p className='single-question'>
        Regular song request amounts, from high to low-
      </p>
      <div className='regular-song-request-amount'>
        {/* RE - USABLE COMPONENT */}
        <FormRow
          type='number'
          className={`small-input center ${
            disabled || regularSongValue.category_7 < 79 ? 'disabled' : ''
          }`}
          value={regularSongValue?.category_7}
          name='category_7'
          onChange={handleChange}
          min={79}
        />
        {/* RE - USABLE COMPONENT */}
        <FormRow
          type='number'
          className={`small-input center ${
            disabled || regularSongValue.category_8 < 59 ? 'disabled' : ''
          }`}
          value={regularSongValue?.category_8}
          name='category_8'
          onChange={handleChange}
          min={59}
        />
        {/* RE - USABLE COMPONENT */}
        <FormRow
          type='number'
          className={`small-input center ${
            disabled || regularSongValue.category_9 < 39 ? 'disabled' : ''
          }`}
          value={regularSongValue?.category_9}
          name='category_9'
          onChange={handleChange}
          min={39}
        />
        {/* RE - USABLE COMPONENT */}
        <FormRow
          type='number'
          className={`small-input center ${
            disabled || regularSongValue.category_10 < 19 ? 'disabled' : ''
          }`}
          name='category_10'
          onChange={handleChange}
          value={regularSongValue?.category_10}
          min={19}
        />
      </div>
    </div>
  )
}
export default RegularSongRequest
