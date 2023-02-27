import React, { useState } from 'react';
import { Link } from 'react-router-dom';




function Registration() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 
  const googleAuth = () => {
    window.open(
      `http://localhost:5000/auth/google/callback`,
      `_self`
    )
  }
  const saveUser = async (e) => {
    e.preventDefault()
    let data = { name, email, password }
    await fetch("http://localhost:5000/register", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((result) => {
      console.log(result)
      if (result.status === 201) {
        window.alert("Successfully Registration")
      } else if (result.status === 409) {
        window.alert("Email is already Registered")
      } else {
        window.alert("Invalid Registration Details")
      }
    })

  }
  return (

    <div>
      <form method="POST" className='controller'>
        <label className="label">Enter Your Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br></br><br></br>
        <label className="label">Enter Your Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br></br><br></br>
        <label className="label">Set Your Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br><br></br>
        <button className="butt" type="submit" onClick={saveUser}>Sign-Up</button><br></br><br></br>
        <Link className="butt" to="/login">Already Sign-up?Sign-in</Link><br></br><br></br>
        <button className="butt" onClick={googleAuth} >Sign up with Google</button><br></br><br></br>
      </form>
    </div>

  );
}

export default Registration;
