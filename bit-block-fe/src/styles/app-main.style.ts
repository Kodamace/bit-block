import { Button } from '@material-ui/core'
import styled from 'styled-components'

export const StyledCoin = styled(Button)`
  &.MuiButtonBase-root {
      background-color: #ffcb47;
      border-radius: 100%;
      height:150px;
      width: 150px;
      font-size: 50px;

      &:hover {
        background-color: #bcebca;
        font-size: 60px;
        height: 180px;
        width: 180px;
      }
  }
`
export const StyledCoinHead = styled(Button)`
&.MuiButtonBase-root {
    background-color: #ffcb47;
    border-radius: 100%;
    font-size: 20px;
    height: 60px;
    margin-right: 10px;
}
`
export const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
      background-color: #ffcb47;

      &:hover {
        background-color: #bcebca;
        font-size: 18px;
      }
  }
`

export const StyledHomePage = styled.div`
background: radial-gradient(#376fff, #0b122e);
height: 100vh;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
`