import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { FormRow, Logo } from '../components'
import { BsFillEyeFill } from 'react-icons/bs'
import { StyledWrapper } from '../assets/wrappers/RegisterAndLogin.styled'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../redux/features/user/userSlice'

// ACTION'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH FORM SUBMISSION
export const action = async ({ request }) => {
  // ACCESSING AND STORING ALL INPUT FILED VALUES
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const response = await axios.post(
      'https://stg.dhunjam.in/account/admin/login',
      data
    )
    // SET ID TO LOCAL STORAGE
    localStorage.setItem('id', response?.data?.data?.id)

    toast.success('login successful.')
    return response
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Login = () => {
  // FOR AUTOMATIC REDIRECTION
  const navigate = useNavigate()
  // FOR DISABLING SUBMIT WHILE MAKE POST REQUEST
  const navigation = useNavigation()
  // FOR GETTING API DATA THROUGH LOADER
  const userDetails = useActionData()
  // FOR DISPATCHING ACTIONS
  const dispatch = useDispatch()
  // NO NEED FOR GLOBAL STATE HERE
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  // TOGGLE PASSWORD WHEN WE CLICK ON THE EYE BUTTON
  const [showPassword, setShowPassword] = useState(false)
  // TO DISABLE LOGIN BUTTON IF THE REQUEST IS BEING PROCESSED
  const isSubmitting = navigation.state === 'submitting'

  // ONCE THE RESPONSE ARRIVES FORM ACTION, GET THE RESPONSE USING ACTION LOADER AND UPDATE REDUX
  useEffect(() => {
    if (userDetails) {
      // SOME DESTRUCTURING
      const {
        data: {
          data: { id, token },
        },
      } = userDetails

      // ONCE DATA IS AVAILABLE UPDATE SATE IN REDUX
      dispatch(
        setUserDetails({
          id,
          token,
        })
      )
      // AFTER LOGIN NAVIGATE THE USER TO DASHBOARD
      navigate('/dashboard')
    }
  }, [userDetails])

  return (
    <StyledWrapper>
      <Logo />
      {/* FORM FROM REACT ROUTER */}
      <Form method='post' className='form'>
        <h4 className='form-title'> Venue Admin Login</h4>
        {/* FORM ROW IS RE - USABLE COMPONENT */}
        <FormRow
          type='text'
          name='username'
          placeholder='username'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        {/* FORM ROW IS RE - USABLE COMPONENT */}
        <FormRow
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<BsFillEyeFill />}
          showPassword={showPassword}
          onClick={() => setShowPassword(!showPassword)}
        />
        {/* DISABLE AND CHANGE TEXT OF A BUTTON WHILE WE ARE SUBMITTING THE FORM */}
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
        <p className='registration'>New Registration ?</p>
      </Form>
    </StyledWrapper>
  )
}
export default Login
