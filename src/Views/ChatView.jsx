import React from 'react';
import ChatPeopleComponent from './ChatPeopleComponent';
import ChatUserComponent from './ChatUserComponent';

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
