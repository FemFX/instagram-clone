import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import Login from "@/screens/login";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Chat: NextPage = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState<string>("");
  const sendMessage = () => {
    socket.emit("msg_server", { message, room });
  };
  useEffect(() => {
    socket.on("msg_client", (data) => {
      setMessages((pv) => [pv, data]);
    });
  }, [socket]);
  const joinRoom = () => {
    if (room) {
      socket.emit("join_chat", { name: room, withUserId: 4 });
    }
  };
  // const sendMessage = () => {
  //   socket.emit("send_message", { message });
  // };
  // useEffect(() => {
  //   socket.on("receive_message", (data: { message: string }) => {
  //     console.log(data);
  //     console.log(messages);

  //     setMessages((pv) => [...pv, data.message]);
  //   });
  // }, [socket]);
  const { me } = useActions();
  const { user, loading, error } = useTypedSelector((state) => state.user);
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      me();
    }
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room..."
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join To Room</button>
      <br />
      <button onClick={sendMessage}>Send</button>
      <hr />
      <div>
        {messages &&
          messages.map((m, idx) => (
            <div>
              {idx + 1}.{m}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Chat;
