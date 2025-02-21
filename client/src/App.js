import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("https://server-build.herokuapp.com");
function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room });
    }
  };

  const sendMessage = () => {
    // console.log("Message sent!");
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      // console.log(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Channel_ID....."
        onChange={(Event) => {
          setRoom(Event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Channel</button>
      <input
        type="text"
        placeholder="Message....."
        onChange={(Event) => {
          setMessage(Event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>

      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
