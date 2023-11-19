import logo from '../assets/images/logo.png'
import { StyledWrapper } from '../assets/wrappers/Logo.styled'

const Logo = () => {
  return (
    <StyledWrapper>
      <img src={logo} alt='dhunJam logo' className='logo' />
    </StyledWrapper>
  )
}
export default Logo
