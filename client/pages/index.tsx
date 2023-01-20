import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import PusherJS from "pusher-js";
import axios from "axios";

let client = new PusherJS("app-key", {
  wsHost: "127.0.0.1",
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  cluster: "ap1",
  // encrypted: true
});

export default function Home() {
  const [name, setName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messageList, setMessageList] = useState<
    {
      name: string;
      message: string;
    }[]
  >([]);

  useEffect(() => {
    const channel = client.subscribe("chat");
    channel.bind("message", (data: any) => {
      console.log({ data, messageList });
      setMessageList([...messageList, data]);
    });
  }, []);

  const onClick = async () => {
    const res = await axios.post("http://localhost:4000/message", {
      name,
      message: newMessage,
    });
    setMessageList([...messageList, res.data]);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description} style={{ display: "flex" }}>
          <div>
            <input onChange={(e) => setName(e.target.value)} value={name} />
            <p>Input new message</p>
            <input
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button onClick={() => onClick()}>Send</button>
          </div>
          <div>
            <p>List Of Message</p>
            {messageList.map((m, i) => (
              <p key={i}>{`${m.name} : ${m.message}`}</p>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}