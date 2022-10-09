import { useEffect, useReducer } from 'react';
import './App.css';
import Chat from './components/Chat';
import JoinBlock from './components/JoinBlock';
import reducer from './components/reducer';
import socket from './components/socket';
const axios = require('axios').default;

function App() {

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    messages: [],
    users: [],
  });

  //  Так как приложение мальенькое то мы используем useReduser вместо Redux 

  const onLogin = async (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    })
    socket.emit("ROOM:JOIN", obj);
    const { data } = await axios.get(`https://chat-lite738733.herokuapp.com/rooms/${obj.roomId}`)
    console.log(data)
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  }

  // Когда мы нажали войти то добовляем в State имя пользователя,номер комнаты , а так же создаем комнату если она не был создана ранее
  //  после чего с помощью GET получаем список юзеров и сообщений в комнате 

  const setUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    })
  }

  // Метод который добовляет ЮЗЕРОВ в state

  const addMessage = (message) => {
    console.log(message)
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };


  useEffect(() => {
    socket.on("ROOM:SET_MESSAGE", addMessage)
    socket.on("ROOM:SET_USERS", setUsers)
  }, []);

  // Меняет отоброжение при входе в чат , а так же отпровляет соккет запрос с переданым типом и данными на сервер 

  // console.log(state)

  return (
    <div className="wrapper">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} addMessage={addMessage} />}
    </div>
  );
}

export default App;
