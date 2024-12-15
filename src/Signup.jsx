import React from 'react'
import image from './assets/WhatsApp Image 2024-12-13 at 10.09.16 PM.jpeg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
const Health = () => {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          alert('Passwords do not match.');
          return;
        }
    
        try {
          await axios.post('http://localhost:5000/register', { username, email, password });
          alert('Registration successful!');
          navigate('/');
        } catch (err) {
          alert('Registration failed. Please try again.');
        }
      };

  return (
    <>
        <div className="container-fluid ">
          <div className="row m-4 ">
           <div className="content" style={{
            gap:"3rem",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
           }}>
           <div className="right-col" style={{
              backgroundColor: '',
              marginLeft:"6rem",
            }}>
              <div className="content mt-5">
              <h1 className="text-center">Welcome to <span>AI</span> Health Advisor</h1>
              <p className='text-center'>The future of medicine lies in the hands of technology
              </p>
              <form  onSubmit={handleRegister} className="form-control my-5 border-0 border border-1 p-4 rounded" style={{
                boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding:"2rem",
               
              }}>
        <h2>Register</h2>
        <input 
          type="text" 
          className="form-control my-3"
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          className="form-control my-3"
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          className="form-control my-3"
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required autoComplete='false' 
        />
        <input 
          type="password" 
          className="form-control my-3"
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required autoComplete='false' 
        />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
              </div>
            </div>
           <div className="left-col">
                <img src={image}  alt="health" style={{
                  width: '500px',
                  height: '500px',
                  borderRadius:'50px',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                }}/>
            </div>
           
           </div>
          </div>
        </div>

    </>
  )
}

export default Health