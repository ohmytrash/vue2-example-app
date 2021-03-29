import io from 'socket.io-client'
import { WS_URL } from '@/common/config'

let socket
if (!socket) socket = io(WS_URL)

export default socket
