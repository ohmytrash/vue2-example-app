import io from 'socket.io-client'

let socket
if (!socket) socket = io(process.env.VUE_APP_WS_URL || 'http://localhost:3000')

export default socket
