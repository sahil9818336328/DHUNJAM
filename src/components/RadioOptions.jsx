/* eslint-disable react/prop-types */
const RadioOptions = ({ selectedOption, disabled, handleRadioChange }) => {
  return (
    <div className='questions'>
      <p className='single-question'>
        Do you want to charge your customers for requesting songs?
      </p>

      <div className='radio-options'>
        <div className='single-options'>
          {/* RADIO OPTION YES */}
          <input
            type='radio'
            id='yes'
            name='options'
            value={true}
            checked={selectedOption === true}
            className={` ${disabled ? 'disabled' : ''}`}
            onChange={handleRadioChange}
          />
          <label htmlFor='yes'>Yes</label>
        </div>
        {/* RADIO OPTION NO */}
        <div className='single-options'>
          <input
            type='radio'
            id='no'
            name='options'
            value={false}
            checked={selectedOption === false}
            className={`${disabled ? 'disabled' : ''}`}
            onChange={handleRadioChange}
          />
          <label htmlFor='no'>No</label>
        </div>
      </div>
    </div>
  )
}
export default RadioOptions
