import React from 'react';
import ChatPeopleComponent from '../Components/ChatPeopleComponent';
import ChatUserComponent from '../Components/ChatUserComponent';

export function ChatView() {
  return (
    <ChatPeopleComponent />
  );
}

export function SingleChatView() {
  return (
    <ChatUserComponent />
  );
}
