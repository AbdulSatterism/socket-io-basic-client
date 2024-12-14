import { useEffect, useMemo, useState } from 'react'
import {io} from 'socket.io-client'

function App() {
const socket =useMemo(()=> io("http://localhost:3000"),[])
const [showMessage, setShowMessage] = useState([]);
const [message, setMessage] = useState("");
const [room, setRoom] = useState("");
const [socketId, setSocketId] = useState("");
// const [roomName, setRoomName] = useState("");



// const handleJoinRoom = (e) => {
//   e.preventDefault();
//   socket.emit("joinRoom", roomName);
//   setRoomName("");
// };

    const handleSendMessage=(e)=>{
    e.preventDefault()
    socket.emit("message",{message,room})
    setMessage('')
    }

    useEffect(()=>{
    socket.on('connect',()=>{
    setSocketId(socket.id)
      })

      socket.on('receiveMessage',(data)=>{
        setShowMessage((messages) => [...messages, data]);

    })

    },[socket])


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
 
     
    <div className="w-full max-w-md bg-white  rounded-xl border border-gray-200 p-6 space-y-6">
     <h1>socket id:{socketId}</h1>
      {/* <form onSubmit={handleJoinRoom} className="space-y-4">
        <div>
          <label 
            htmlFor="roomName" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            RoomName
          </label>
          <input
            id="roomName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="enter room name"
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white "
          >
         join room
          </button>
        </div>
      </form> */}
      <form onSubmit={handleSendMessage} className="space-y-4">
        {/* Message Textarea */}
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 resize-y"
            rows="6"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Room Input */}
        <div>
          <label 
            htmlFor="room" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            RoomId
          </label>
          <input
            id="room"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Enter room name"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
          />
        </div>

        {/* Send Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
    <div className="w-full max-w-md bg-white shadow-2xl rounded-xl border border-gray-200 p-6">
  {showMessage?.map((m,i)=><div key={i}>
  <p>{m}</p>
  </div>)}
</div>
    </div>

  )
}

export default App
