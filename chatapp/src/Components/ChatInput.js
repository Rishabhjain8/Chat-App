import React, {useState} from 'react';
import styled from 'styled-components';
import {IoMdSend} from 'react-icons/io';

const ChatInput = ({handleSendMsg}) => {
    let [message, setMessage] = useState("");

    const sendChat = (e) => {
        e.preventDefault();
        if(message.length > 0){
            handleSendMsg(message);
            setMessage('');
        }
    }

  return (
    <Container>
        <div>
            <form className='input-container' onSubmit={sendChat}>
                <input type="text" placeholder='Type your message here' value = {message} onChange={(e) => setMessage(e.target.value)}/>
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
            </div>
    </Container>
  )
}


const Container = styled.div`
.input-container{
    width: 100%;
    background-color: #ffffff34;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 4px;
    input{
        width: 90%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection{
            background-color: #9186f3;

        }
        &:focus{
            outline: none;
        }
    }
    button{
        padding: 0.3rem 1.2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #9a86f3;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            padding: 0.2rem 1rem;
            svg {
              font-size: 1rem;
            }
        }
        svg{
            font-size: 2rem;
            color: white;
        }
    }
}
`

export default ChatInput