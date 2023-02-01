import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import './Notific.css';
const socket = io.connect("http://localhost:3001");
function NotificPage() {
    const [name,setName]=useState(JSON.parse(localStorage.auth).name)
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    console.log(JSON.parse(localStorage.auth).name)
    const joinRoom = (e) => {
      e.preventDefault()
      if (room !== "") {
        socket.emit("join_room", room);
      }
    };
  
    const sendMessage = (e) => {
      e.preventDefault()
      socket.emit("send_message", { message, room });
    };

    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
      });
    }, [socket]);

  return (
    <div className="cont">
      <h1>Notification System </h1>
      <h3>WelCome {name}</h3>
      <div className="sub-con">
        <input type="text" placeholder='Enter Your Id' onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>Join</button><br></br><br></br>
        <input type="text" placeholder='Enter Your Message' onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
        <h4>You Have Notification</h4>{messageReceived}
      </div>
    </div>
  )
}

export default NotificPage
