import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .restobar-details {
    .restobar-description {
      margin-bottom: 2rem;
      font-weight: 600;
      font-size: 2rem;
      text-align: center;
    }

    .questions {
      display: flex;
      align-items: center;
      gap: 5rem;
      margin-bottom: 1rem;

      .radio-options {
        margin: 0 auto;
        display: flex;
        gap: 1.5rem;

        .single-options {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          input[type='radio']:checked {
            background-color: red;
            color: red;
            border-color: red;
          }
        }
      }
      .center {
        text-align: center;
      }

      .disabled {
        background-color: var(--grey-700);
        opacity: 0.5;
        /* cursor: not-allowed; */
      }

      .song-request-amount {
        flex: 1;
      }
      .single-question {
        width: 280px;
        line-height: 1.2;
        letter-spacing: 1px;
      }

      .regular-song-request-amount {
        display: flex;
        gap: 1rem;
        align-items: center;

        .small-input {
          width: 100px;
        }
      }
    }
  }
`
