import io from "socket.io-client"

const socket = io("https://chat-lite738733.herokuapp.com")

export default socket;