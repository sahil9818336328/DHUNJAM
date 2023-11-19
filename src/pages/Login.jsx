import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { FormRow } from '../components'
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
    localStorage.setItem('id', response?.data?.data?.id)

    toast.success('login successful.')
    return response
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Login = () => {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const userDetails = useActionData()
  const dispatch = useDispatch()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  // TO DISABLE LOGIN BUTTON IF THE REQUEST IS BEING PROCESSED
  const isSubmitting = navigation.state === 'submitting'

  // ONCE THE RESPONSE ARRIVES FORM ACTION, GET THE RESPONSE USING ACTION LOADER AND UPDATE REDUX
  useEffect(() => {
    if (userDetails) {
      const {
        data: {
          data: { id, token },
        },
      } = userDetails

      dispatch(
        setUserDetails({
          id,
          token,
        })
      )
      navigate('/dashboard')
    }
  }, [userDetails])

  return (
    <StyledWrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'> Venue Admin Login</h4>
        <FormRow
          type='text'
          name='username'
          placeholder='username'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <FormRow
          type='text'
          name='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<BsFillEyeFill />}
          showPassword={showPassword}
          onClick={() => setShowPassword(!showPassword)}
        />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
        <p className='registration'>New Registration ?</p>
      </Form>
    </StyledWrapper>
  )
}
export default Login
