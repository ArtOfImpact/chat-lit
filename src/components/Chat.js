import { useEffect, useRef, useState } from "react";
import socket from "./socket";


function Chat({ users, messages, roomId, userName, addMessage }) {

    const [messageValue, setMessageValue] = useState('');
    const messageRef = useRef(null)

    const onSendMessage = () => {
        socket.emit("ROOM:NEW_MESSAGE", {
            userName,
            roomId,
            text: messageValue,
        })
        addMessage({
            userName,
            text: messageValue,
        })
        setMessageValue("")
    }

    useEffect(() => {
        messageRef.current.scrollTo(0, 99999)
    }, [messages])

    return (
        <div className="chat">
            <div className="chat-users">
                Комната: <b>{roomId}</b>
                <hr />
                <b>Онлайн:{users.length}</b>
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messageRef} className="messages">
                    {messages.map((message, index) => (
                        <div className="message" key={message + index}>
                            <p>{message.text}</p>
                            <div>
                                <span>{message.userName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <form>
                    <textarea
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                        className="form-control"
                        rows="3"></textarea>
                    <button type="button" onClick={onSendMessage} className="btn btn-primary">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat