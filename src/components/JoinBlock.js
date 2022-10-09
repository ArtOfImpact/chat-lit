import { useState } from "react"
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
        await axios.post("http://localhost:8888/rooms", obj)
        onLogin(obj)
    }

    // Проверяет заполнены ли поля , если все ОК тогда отпровляет POST запрос 
    // Так же с помощью onLogin меняет State.joined на true что бы отоброзить чат место входа и отпровляет сокет запрос 

    return (
        <div className='container-wrapper'>
            <TextField color="warning" id="outlined-basic" label="ID room" variant="outlined" value={roomId} onChange={e => setRoomID(e.target.value)} />
            <TextField color="warning" id="outlined-basic" label="Name" variant="outlined" value={userName} onChange={e => setUserName(e.target.value)} />
            <Button variant="outlined" color="error" onClick={onEnter}>
                Connect
            </Button>
        </div>
    )
}

export default JoinBlock