import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Layout from "../components/Layout";

const socket = io("http://localhost:8080");

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    if (!msg.trim()) return;
    socket.emit("send_message", msg);
    setMsg("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages(prev => [...prev, data]);
    });
  }, []);

  return (
    <Layout>
      <h1>💬 Live Chat</h1>

      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div key={i} style={styles.msg}>
            {m}
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Type message..."
          style={styles.input}
        />
        <button onClick={send} style={styles.btn}>
          Send
        </button>
      </div>
    </Layout>
  );
}

const styles = {
  chatBox: {
    height: "60vh",
    overflowY: "auto",
    background: "#151521",
    padding: "15px",
    borderRadius: "10px"
  },
  msg: {
    background: "#1f1f2e",
    padding: "10px",
    margin: "6px 0",
    borderRadius: "8px"
  },
  inputArea: {
    display: "flex",
    marginTop: "10px"
  },
  input: {
    flex: 1,
    padding: "10px"
  },
  btn: {
    background: "#ffd60a",
    border: "none",
    padding: "10px"
  }
};