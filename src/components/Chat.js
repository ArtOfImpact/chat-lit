import { useEffect, useRef, useState } from "react";
import socket from "./socket";


function Chat({ users, messages, roomId, userName, addMessage }) {

    const [messageValue, setMessageValue] = useState('');
    const messageRef = useRef(null)

    const onSendMessage = () => {
        if (messageValue.length > 0) {
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
    }

    const SearchKey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSendMessage()
        }
    }

    useEffect(() => {
        messageRef.current.scrollTo(0, 99999)
    }, [messages])

    return (
        <div className="chat">
            <div className="chat-users">
                Комната: <span>{roomId}</span>
                <hr />
                <span>Онлайн:{users.length}</span>
                <ul>
                    {users.map((name, index) => (
                        name === userName ? <li className="users__active" key={name + index}>{name}</li> : <li className="users" key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messageRef} className="messages">
                    {messages.map((message, index) => (
                        message.userName === userName ?
                            <div className="message__active" key={message + index}>
                                <p>{message.text}</p>
                                <div>
                                    <span>{message.userName}</span>
                                </div>
                            </div>
                            :
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
                        onKeyDown={SearchKey}
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