import React from 'react'
import { useHistory } from 'react-router'
import { StyledButton, StyledCoin, StyledHomePage } from '../../styles'

function HomePage() {

    const history = useHistory()
    return (
        <StyledHomePage >
        <div>
          <StyledCoin>$B</StyledCoin>
          <h2 style={{paddingTop: 30}}>Welcome to Bit Block</h2>
          <h3>View Blocks, difficulty, and trade crypto</h3>
          <StyledButton onClick={() => history.push('/blocks')}>Go To Blocks</StyledButton>
        </div>
      </StyledHomePage>
    )
}

export default HomePage
