import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Contacts from './Contacts';
import axios from 'axios';
import styled from 'styled-components';
import ChatTalk from './ChatTalk';
import ChatContainer from './ChatContainer';
import {io} from 'socket.io-client';

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if(currentUser){
      socket.current = io("http://localhost:5000");        //when the current user is logged in it will set user to the gobalOnlineUser
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])

  useEffect(() => {
    const getUser = async () => {
      if (!localStorage.getItem('user')) {
        navigate("/login");
      }
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem('user')));
        setIsLoaded(true);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    const setUser = async () => {
      if (currentUser) {
        if (currentUser.isAvatar) {
          const response = await axios.get(`http://localhost:5000/api/auth/getalluser/${currentUser._id}`);
          setContacts(response.data);
        }
        else {
          navigate("/setavatar");
        }
      }

    }
    setUser();
  }, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {
          isLoaded && currentChat === undefined ?
            <ChatTalk currentUser={currentUser} /> :
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: #0c0e21;
.container{
  height: 80vh;
  width: 80vw;
  background-color: #030117;
  display: grid;
  @media screen and (min-width: 300px) and (max-width: 719px) {
    height: 95%;
    width: 90%;
    grid-template-rows: 35% 65%;
  }
  @media screen and (min-width: 720px){
    grid-template-columns: 30% 70%;
  }
}
`

export default Chat
