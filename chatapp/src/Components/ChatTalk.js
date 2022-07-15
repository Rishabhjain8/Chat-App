import React from 'react';
import styled from 'styled-components';
import robot from './robot.gif';

const ChatTalk = ({currentUser}) => {
  return (
    <Container>
        <img src = {robot} alt = "welcome"/>
        <h1>Welcome, <span>{currentUser.name}</span></h1>
        <h3>Select a user to have fun with your friends</h3>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: white;
gap: 0rem;
img{
    height: 20rem;
}
span{
    color: #1b0cad;
}
`

export default ChatTalk