import React, { useState } from 'react';
import { Link } from 'react-router-dom';




function Registration() {

  const [Name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")


  const saveUser = async (e) => {
    e.preventDefault()
    let data = { Name,userName, password}
    await fetch("http://localhost:3001/registration", {
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
        window.alert("userName is already Registered")
      } else {
        window.alert("Invalid Registration Details")
      }
    })

  }
  return (

    <div>
      <form method="POST" className='controller'>
        <label className="label">Enter Your Name</label>
        <input type="text" value={Name} onChange={(e) => setName(e.target.value)} /><br></br><br></br>
        <label className="label">Enter Your UserName</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /><br></br><br></br>
        <label className="label">Set Your Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br><br></br>
        <button className="butt" type="submit" onClick={saveUser}>Sign-Up</button><br></br><br></br>
        <Link className="butt" to="/login">Already Sign-up?Sign-in</Link><br></br><br></br>
      </form>
      </div>

  );
}

export default Registration;
