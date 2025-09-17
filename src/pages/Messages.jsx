import React, { useState, useEffect } from "react";
import "../Message.css";

export default function Messages() {
  const users = [
    { id: 1, name: "Maria Khan", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 2, name: "Ali Raza", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Sara Ahmed", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 4, name: "Hamza Malik", avatar: "https://randomuser.me/api/portraits/men/28.jpg" },
    { id: 5, name: "Zara Sheikh", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
    { id: 6, name: "Usman Ali", avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
    { id: 7, name: "Fatima Noor", avatar: "https://randomuser.me/api/portraits/women/23.jpg" },
  ];

  const conversations = {
    1: [
      { sender: "them", text: "Hey, are you going to Hussain?", time: "1:06pm" },
      { sender: "me", text: "Yes, I’ll be there in 10 mins.", time: "1:08pm" },
      { sender: "them", text: "Perfect! See you soon.", time: "1:10pm" },
    ],
    2: [
      { sender: "them", text: "Hey bro, how’s it going?", time: "12:40pm" },
      { sender: "me", text: "All good! Busy with work, you?", time: "12:42pm" },
      { sender: "them", text: "Same here, too much workload.", time: "12:45pm" },
    ],
    3: [
      { sender: "them", text: "Thanks for your help yesterday!", time: "11:20am" },
      { sender: "me", text: "No problem at all 😃", time: "11:22am" },
      { sender: "them", text: "You saved my day.", time: "11:30am" },
    ],
    4: [
      { sender: "them", text: "Meeting at 5, right?", time: "10:05am" },
      { sender: "me", text: "Yes bro, don’t be late.", time: "10:10am" },
      { sender: "them", text: "Haha, I’ll try.", time: "10:15am" },
    ],
    5: [
      { sender: "them", text: "Can you send me the files?", time: "9:40am" },
      { sender: "me", text: "I already mailed them.", time: "9:42am" },
      { sender: "them", text: "Ohh got it. Thanks 👍", time: "9:45am" },
    ],
    6: [
      { sender: "them", text: "Kahan ho?", time: "Yesterday" },
      { sender: "me", text: "Bas nikal raha hoon.", time: "Yesterday" },
      { sender: "them", text: "Okay, I’m waiting.", time: "Yesterday" },
    ],
    7: [
      { sender: "them", text: "Long time no see!", time: "Monday" },
      { sender: "me", text: "Haha true! Let’s catch up soon.", time: "Monday" },
      { sender: "them", text: "Sure, coffee plan?", time: "Monday" },
    ],
  };

  const [activeChat, setActiveChat] = useState(null);

<<<<<<< HEAD
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setActiveChat(users[0]);
=======
  // ✅ Page load par desktop view me pehli chat auto-open
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setActiveChat(users[0]); // Maria Khan default
>>>>>>> kashaf
    }
  }, []);

  return (
    <div className="messagePage">
      <div className="chatContainer">
<<<<<<< HEAD
        <div className={`userList ${activeChat ? "hide" : ""}`}>
          <h3 className="sub-titlees">Messages</h3>
=======
        {/* Users List */}
        <div className={`userList ${activeChat ? "hide" : ""}`}>
          <h3 className="title">Messages</h3>
>>>>>>> kashaf
          <input type="text" className="search" placeholder="Search Name" />

          {users.map((user) => {
            const lastMsg = conversations[user.id][conversations[user.id].length - 1];
            return (
              <div
                key={user.id}
                className="userItem"
                onClick={() => setActiveChat(user)}
              >
                <img src={user.avatar} alt="avatar" className="avatar" />
                <div className="userText">
                  <p className="name">{user.name}</p>
                  <p className="preview">{lastMsg.text}</p>
                </div>
                <span className="time">{lastMsg.time}</span>
              </div>
            );
          })}
        </div>

        {/* Chat Window */}
        <div className={`chatWindow ${activeChat ? "active" : ""}`}>
          {activeChat && (
            <>
              <div className="chatHeader">
<<<<<<< HEAD
=======
                {/* Back button (mobile only) */}
>>>>>>> kashaf
                <button
                  className="backBtn"
                  onClick={() => setActiveChat(null)}
                >
                  ←
                </button>
                <img src={activeChat.avatar} alt="avatar" className="avatar" />
                <div>
                  <h3 className="name">{activeChat.name}</h3>
                  <p className="status">Online</p>
                </div>
              </div>

              <div className="chatMessages">
                {conversations[activeChat.id].map((msg, i) => (
                  <div
                    key={i}
                    className={`messageRow ${msg.sender === "me" ? "right" : "left"}`}
                  >
                    <div
                      className={`messageBubble ${
                        msg.sender === "me" ? "sender" : "receiver"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="time">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="chatInput">
                <input type="text" placeholder="Send Message" />
                <button>Send</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> kashaf
