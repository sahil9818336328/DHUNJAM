/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { StyledWrapper } from '../assets/wrappers/Admin.styled'
import {
  BarChart,
  CustomSongRequest,
  RadioOptions,
  RegularSongRequest,
} from '.'
import { barChartData, disableElements } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { updateAmount } from '../redux/features/user/userSlice'

const Admin = ({ amount, charge_customers, id, location, name }) => {
  // NO NEED FOR GLOBAL STATE
  // CONTROLLED INPUTS

  // KEEP TRACK OF CUSTOM SONG VALUE
  const [customSongValue, setCustomSongValue] = useState('')
  // KEEP TRACK OF REGULAR SONG VALUES
  const [regularSongValue, setRegularSongValue] = useState({})
  // KEEP TRACK OF SELECTED OPTION, TO DISABLE AND ENABLE ELEMENTS
  const [selectedOption, setSelectedOption] = useState(charge_customers)
  // TO KEEP TRACK OF THE API PAYLOAD
  const [apiPayload, setApiPayload] = useState({ amount: {}, id })
  // TO SHOW LOADING SPINNER
  const { isLoading } = useSelector((state) => state.user)
  // VARIABLE THAT DISABLES ELEMENTS
  const disabled = selectedOption === false
  // FOR DISPATCHING ACTIONS
  const dispatch = useDispatch()

  // UPDATE VALUES OF RADIO BUTTON
  const handleRadioChange = (event) => {
    setSelectedOption(JSON.parse(event.target.value))
  }

  // ONCE WE HAVE THE AMOUNT FROM API RESPONSE THEN POPULATE THE INPUT FIELDS AS SPECIFIED
  useEffect(() => {
    if (amount) {
      // SET CUSTOM SONG VALUE
      setCustomSongValue(amount?.category_6)
      // SET REGULAR SONG VALUES
      setRegularSongValue({
        category_7: amount?.category_7,
        category_8: amount?.category_8,
        category_9: amount?.category_9,
        category_10: amount?.category_10,
      })
    }
  }, [amount])

  // TO KEEP TRACK OF WHAT DATA NEEDS TO BE SENT AS PAYLOAD
  const handleApiPayloadData = (e) => {
    const name = e.target.name
    const value = e.target.value
    setApiPayload({
      ...apiPayload,
      amount: { ...apiPayload.amount, [name]: value },
    })
  }

  // DYNAMIC KEYS
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRegularSongValue({ ...regularSongValue, [name]: value })
    handleApiPayloadData(e)
  }

  // DISPATCH ACTION TO UPDATE AMOUNTS
  const handleAmountSubmission = () => {
    dispatch(updateAmount(apiPayload))
  }

  return (
    <StyledWrapper>
      <div className='container'>
        <div className='restobar-details'>
          {/* RESTO BAR NAME AND LOCATION  */}
          <h2 className='restobar-description'>
            {name} {location} on Dhun Jam
          </h2>

          {/* RESTO BAR RADIO OPTIONS COMPONENT */}
          <RadioOptions
            selectedOption={selectedOption}
            disabled={disabled}
            handleRadioChange={handleRadioChange}
          />

          {/* RESTO BAR CUSTOM SONG REQUEST COMPONENT */}
          <CustomSongRequest
            customSongValue={customSongValue}
            disabled={disabled}
            setCustomSongValue={setCustomSongValue}
            handleApiPayloadData={handleApiPayloadData}
          />

          {/* RESTO BAR REGULAR SONG REQUEST COMPONENT */}
          <RegularSongRequest
            disabled={disabled}
            regularSongValue={regularSongValue}
            handleChange={handleChange}
          />

          {/* BAR CHAR GETS DISABLED IF VALUE OF CHARGE_CUSTOMERS IS FALSE */}
          {!disabled && (
            <BarChart data={barChartData(customSongValue, regularSongValue)} />
          )}
          {/* SAVE BUTTON */}
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
