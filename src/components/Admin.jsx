/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { StyledWrapper } from '../assets/wrappers/Admin.styled'
import FormRow from './FormRow'
import { BarChart } from '.'
import { barChartData, disableElements } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { updateAmount } from '../redux/features/user/userSlice'

const Admin = ({ amount, charge_customers, id, location, name }) => {
  const [customSongValue, setCustomSongValue] = useState('')
  const [regularSongValue, setRegularSongValue] = useState({})
  const [selectedOption, setSelectedOption] = useState(charge_customers)
  const [apiPayload, setApiPayload] = useState({ amount: {}, id })
  const { isLoading } = useSelector((state) => state.user)
  const disabled = selectedOption === false
  const handleRadioChange = (event) => {
    setSelectedOption(JSON.parse(event.target.value))
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (amount) {
      setCustomSongValue(amount?.category_6)
      setRegularSongValue({
        category_7: amount?.category_7,
        category_8: amount?.category_8,
        category_9: amount?.category_9,
        category_10: amount?.category_10,
      })
    }
  }, [amount])

  const handleApiPayloadData = (e) => {
    const name = e.target.name
    const value = e.target.value
    setApiPayload({
      ...apiPayload,
      amount: { ...apiPayload.amount, [name]: value },
    })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRegularSongValue({ ...regularSongValue, [name]: value })
    handleApiPayloadData(e)
  }

  const handleAmountSubmission = () => {
    dispatch(updateAmount(apiPayload))
  }

  return (
    <StyledWrapper>
      <div className='container'>
        <div className='restobar-details'>
          <h2 className='restobar-description'>
            {name} {location} on Dhun Jam
          </h2>

          <div className='questions'>
            <p className='single-question'>
              Do you want to charge your customers for requesting songs?
            </p>

            <div className='radio-options'>
              <div className='single-options'>
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

          <div className='questions'>
            <p className='single-question'>Custom song request amount-</p>
            <div className='song-request-amount'>
              <FormRow
                type='number'
                value={customSongValue}
                className={`center ${
                  disabled || customSongValue < 99 ? 'disabled' : ''
                }`}
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

          <div className='questions'>
            <p className='single-question'>
              Regular song request amounts, from high to low-
            </p>
            <div className='regular-song-request-amount'>
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
              <FormRow
                type='number'
                className={`small-input center ${
                  disabled || regularSongValue.category_10 < 19
                    ? 'disabled'
                    : ''
                }`}
                name='category_10'
                onChange={handleChange}
                value={regularSongValue?.category_10}
                min={19}
              />
            </div>
          </div>

          {!disabled && (
            <BarChart data={barChartData(customSongValue, regularSongValue)} />
          )}
          <button
            type='submit'
            className='btn btn-block'
            disabled={disableElements(
              disabled,
              customSongValue,
              regularSongValue,
              isLoading
            )}
            onClick={handleAmountSubmission}
          >
            save
          </button>
        </div>
      </div>
    </StyledWrapper>
  )
}
export default Admin
