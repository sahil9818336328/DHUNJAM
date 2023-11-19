import { Link, useRouteError } from 'react-router-dom'
import notFound from '../assets/images/notFound.svg'
import { StyledWrapper } from '../assets/wrappers/Error.styled'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/features/user/userSlice'

const Error = () => {
  // USE ROUTER ERROR WAS RELEASED IN LATEST VERSION OF REACT, WHICH BASICALLY HELPS IN PROVIDING ERROR INFORMATION
  const error = useRouteError()

  // TO DISPATCH ACTION
  const dispatch = useDispatch()

  // LOG OUT USER
  const handleClick = () => {
    dispatch(logoutUser())
  }

  // BASED ON THE STATUS RENDER DIFFERENT VIEW
  if (error.status === 404) {
    return (
      <StyledWrapper>
        <div>
          <img src={notFound} alt='page not found' />
          <h3>Ohh! page not found</h3>
          <p>
            We can&apos;t seem to find the page you&apos;ve been looking for.
          </p>
          <Link to='/' onClick={handleClick}>
            Back home
          </Link>
        </div>
      </StyledWrapper>
    )
  }
  return (
    <StyledWrapper>
      <div>
        <h3>{error}...</h3>
      </div>
    </StyledWrapper>
  )
}
export default Error
