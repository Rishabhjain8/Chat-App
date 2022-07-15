import React, {useState, useEffect} from 'react';
import '../CSS/signup.css';
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Logo from './logo.png';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const SignUp = () => {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(handleValidation()){
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method:'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name: values.name, email: values.email, password: values.password})
            })

            const data = await response.json();
            if(data.success){
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate("/");
            }
            else{
                toast.error('Try again after sometime(May be user with this email already exists', options);
            }
        }
    }

    const options = {
        position: "top-right",
        autoClose: 10000,
        pauseOnHover: true,
        draggable: false,
        theme: 'dark'
    };

    const handleValidation = () => {
        const {name, password, cpassword} = values;

        if(password !== cpassword){
            toast.error('Password and confirm password should be same', options);
            return false;
        }
        else if(name.length < 3){
            toast.error('Name should be of atleast 3 in length', options);
            return false;
        }
        else if(password.length < 8){
            toast.error('Password should be of atleast 8 in length', options);
            return false;
        }

        return true;
    }

    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate("/");
        }
    },[]);
    
    return (
        <>
            <FormContainer>
                <form action="" onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>snappy</h1>
                    </div>
                    <input type="text" placeholder="name" name="name" onChange={(e) => handleChange(e)} min="3"/>
                    <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder="Confirm Password" name="cpassword" onChange={(e) => handleChange(e)} />
                    <button type="submit">Sign Up</button>
                    <span>
                        Already have an account ? <Link to="/login">Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </FormContainer>
        </>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default SignUp