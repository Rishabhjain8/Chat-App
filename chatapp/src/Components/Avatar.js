import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import loader from './loader.gif';
import { Buffer } from "buffer";
import axios from "axios";
import styled from 'styled-components';

const Avatar = () => {
    let navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const api = `https://api.multiavatar.com/48686942`;;

    const options = {
        position: "top-right",
        autoClose: 10000,
        pauseOnHover: true,
        draggable: false,
        theme: 'dark'
    };

    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate("/login");
        }
    },[]);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", options);
        } else {
            const user = await JSON.parse(localStorage.getItem('user'));

            const { data } = await axios.post(`http://localhost:5000/api/auth/setavatar/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatar = true;
                user.avatarImage = data.image;
                localStorage.setItem('user', user);
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again.", options);
            }
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            const data = []
            for (let i = 0; i < 6; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <>
            {
                isLoading ?
                    <Container>
                        <img src={loader} alt="loader" className="loader" />
                    </Container> :
                    <Container>
                        <div className='title-container'>
                            <h1>Pick an avatar as your profile picture</h1>
                        </div>
                        <div className='avatars'>
                            {
                                avatars.map((avatar, index) => {
                                    return (
                                        <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`} key={avatar}>
                                            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button onClick={setProfilePicture} className="submit-btn">
                            Set as Profile Picture
                        </button>
                    </Container>}
            <ToastContainer />

        </ >
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 2.5rem;
background-color: #0c0e21;
height: 100vh;
width: 100vw;
.loader{
    max-inline-size: 100%
}
.title-container{
    color: white;
}
.avatars{
    display: flex;
    gap: 2rem;
    .avatar{
        border: 0.4rem solid transparent;
        border-radius: 4rem;
        padding: 0.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            height: 4rem;
            transition: 0.5s ease-in-out;
        }
    }
    .selected{
        border: 0.4rem solid #040f7a;
    }
}
    
    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
          background-color: #040f7a;
        }
    }

`

export default Avatar