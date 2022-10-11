import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const axios = require('axios').default;

function JoinBlock({ onLogin }) {

    const [roomId, setRoomID] = useState('');
    const [userName, setUserName] = useState('');

    // 2 state для оживления инпутов и передачи их в POST

    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert("Введите все необходимые данные !")
        }
        const obj = {
            roomId,
            userName
        }
        await axios.post("https://chat-lite738733.herokuapp.com/rooms", obj)
        onLogin(obj)
    }

    // Проверяет заполнены ли поля , если все ОК тогда отпровляет POST запрос 
    // Так же с помощью onLogin меняет State.joined на true что бы отоброзить чат место входа и отпровляет сокет запрос 

    useEffect(async () => {
        const { data } = await axios.get("https://chat-lite738733.herokuapp.com/rooms")
        console.log(data)
    }, [])

    return (
        <div className='container-wrapper'>
            <h1>Online - chat</h1>
            <h3>Online:</h3>
            <input placeholder="ID room" value={roomId} onChange={e => setRoomID(e.target.value)} />
            <input placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)} />
            <button onClick={onEnter}>Connect</button>
        </div>
    )
}

export default JoinBlock