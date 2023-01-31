import React, { useState } from 'react'
import { useNavigate } from 'react-router';
// import './Login.css';

function Login() {
    const history = useNavigate()
    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")

    const loginUserData = async (e) => {
        e.preventDefault()
        console.log({ userName, password })
        let data = { userName, password }
        await fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            console.log(result)
            if (result.status === 200) {
                result.json().then((resp) => {
                    localStorage.setItem("auth", JSON.stringify(resp.data))
                })
                window.alert("Successfully LogIn")
                history("/main")
            } else {
                window.alert("Invalid Credential")
            }
        })

    }
    return (
 
            <div>
                <form method="POST" className='controller'>
                    <label className="label">Enter Your userName</label>
                    <input type="userName" value={userName} onChange={(e) => setuserName(e.target.value)} />
                    <br></br><br></br><label className="label">Enter Your Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br></br><br></br><button className="but" type="submit" onClick={loginUserData}>Log-In</button>
                </form>
            </div>

    );
}

export default Login;
