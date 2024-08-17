import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  let [firstname, setfirstname] = useState('');
  let [lastname, setlastname] = useState('');
  let [email, setemail] = useState('');
  let [password, setpassword] = useState('');

  async function sendingData(event) {
    event.preventDefault();

    let usersinfo = { firstname, lastname, email, password };
    try {
      let response = await fetch('http://localhost:4000/', {
        method: "POST",
        body: JSON.stringify(usersinfo),
        headers: {
          "Content-Type": "application/json",
        }

      }).then((res)=>{
        if (res.ok) navigate('/game')
         return res.json()
      }).then((data)=>{
        const token = data.token;     
        localStorage.setItem("token",token)
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form id='form-data' onSubmit={sendingData}>
        <label htmlFor="FirstName">Firstname:</label>
        <input type="text" name="FirstName" onChange={(e) => setfirstname(e.target.value)} placeholder='firstname' id="firstname" className='input-box' />

        <label htmlFor="lastname">lastname:</label>
        <input type="text" name="lastname" id="lastname" onChange={(e) => setlastname(e.target.value)} className='input-box' placeholder='lastname' />

        <label htmlFor="email">email:</label>
        <input type="email" name="email" id="email_input" onChange={(e) => setemail(e.target.value)} placeholder='email' className='input-box' />

        <label htmlFor="set-password">password:</label>
        <input type="password" name="set-password" onChange={(e) => setpassword(e.target.value)} placeholder='password' className='input-box' id="password" />

        <label htmlFor="confirm-pass">confirm-password:</label>
        <input type="password" name="confirm-pass" placeholder='confirm-password' className='input-box' id="confirm-password" />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Login;
