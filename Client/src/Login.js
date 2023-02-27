import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
// import './Login.css';

function Login() {

    const googleAuth = () => {
        window.open(
            `http://localhost:5000/auth/google/callback`,
            `_self`
        )
        
    }
    const history = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUserData = async (e) => {
        e.preventDefault()
        console.log({ email, password })
        let data = { email, password }
        await fetch("http://localhost:5000/login", {
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
                history("/home")
            } else {
                window.alert("Invalid Credential")
            }
        })

    }
    return (

        <div>
            <form method="POST" className='controller'>
                <label className="label">Enter Your Email</label>
                <input type="userName" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br></br><br></br><label className="label">Enter Your Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br></br><br></br><button className="but" type="submit" onClick={loginUserData}>Log-In</button>
                <button className="butt" onClick={googleAuth} >Sign up with Google</button><br></br><br></br>
            </form>
        </div>

    );
}

export default Login;
