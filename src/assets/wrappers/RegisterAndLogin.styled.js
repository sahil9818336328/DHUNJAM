import styled from 'styled-components'

export const StyledWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form {
    max-width: 500px;

    .icon-container {
      position: relative;
      display: flex;
      align-items: center;

      .eye-icon {
        position: absolute;
        right: 0.5rem;
      }
    }

    .registration {
      font-size: 0.9rem;
    }
  }
  .form-title {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 2.5rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
`
