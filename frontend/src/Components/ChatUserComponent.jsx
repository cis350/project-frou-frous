import './chat.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChatMessages, sendChatMessage } from '../api/chatAPI';
import ChatPeopleComponent from './ChatPeopleComponent';

export default function ChatUserComponent() {
  const user = useParams();
  const curUser = sessionStorage.getItem('username');
  const home = `/app/user/${curUser}`;
  const [time, setTime] = useState(Date.now());

  function scrollMessages() {
    const messageDiv = document.getElementById('messages');
    const sheight = messageDiv.scrollHeight;
    messageDiv.scrollTop = sheight;
  }

  const getChats = async () => {
    try {
      let chats = '';
      const res = await getChatMessages(user.user, curUser);
      for (let i = 0; i < res.messages.length; i += 1) {
        let leftRight = 'messageLeft';
        const message = res.messages[i];
        if (message.sender === curUser) {
          leftRight = 'messageRight';
        }
        chats = chats.concat(`
          <div class='${leftRight} message'>
              <p class="messageContent"> ${message.message} </p>
          </div>
          `);
      }
      document.getElementById('messages').innerHTML = chats;
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getChats();
    setInterval(() => {
      setTime(Date.now());
    }, 1000);
  }, [time]);

  async function sendMessage() {
    const chat = document.getElementById('chatSend');
    if (chat) {
      if (chat.value !== '') {
        try {
          await sendChatMessage(chat.value, curUser, user.user);
          await getChats();
          chat.value = '';
          chat.focus();
        } catch (err) {
          alert(err.message);
        }
      }
    }
    scrollMessages();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div id="chatWrapper">
      <div id="peopleContainer" style={{ width: '30%' }}>
        <ChatPeopleComponent />
      </div>

      <div id="chatWindow">
        <div id="chatBar" className="flex-row">
          <h2 style={{ margin: '8px', marginLeft: '12px' }}>{user.user}</h2>
          <a className="chatA" href={home}>
            <p id="homeIcon" className="bi bi-house-fill" />
          </a>
        </div>

        <div id="messages" />

        <div id="sendWrapper">
          <div id="sendMessageBar" className="input-group rounded-8">
            <input
              type="text"
              id="chatSend"
              className="border-0"
              style={{
                marginLeft: '10px',
                marginRight: '10px',
                textAlign: 'left',
                outline: 'none',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" onClick={sendMessage} onSubmit={sendMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
              </svg>
            </button>
          </div>
        </div>

      </div>

    </div>

  );
}
