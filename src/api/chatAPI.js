async function getChatId(user, reciever) {
  let response = await fetch(`http://localhost:5002/chat/getChatId/${user}/${reciever}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default',
  });
  response = await response.json();
  return response.data;
}

export async function sendChatMessage(message, user, reciever) {
  const chat = await getChatId(user, reciever);
  console.log('CHAT', chat);
  const response = await fetch('http://localhost:5002/chat/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify({ sender: user, message, chatId: chat }),
  });
  console.log(response);
  return response;

  // const res = await axios.post(`/chat/send/${message}`);
  // mes.push({
  //   message,
  //   sent: true,
  // });
  // return res.data;
}

export async function getChatMessages(user, reciever) { //eslint-disable-line
  const chat = await getChatId(user, reciever);
  let response = await fetch(`http://localhost:5002/chat/user/${user}/${reciever}/${chat}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default',
  });
  response = await response.json();
  // console.log(response);
  return { messages: response.data };
}

export const getChatFriends = async (user) => {
  console.log('CHAT API MAKING FETCH CALL TO GET FRIENDS');
  let response = await fetch(`http://localhost:5002/chat/getFriends/${user}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default',
  });
  response = await response.json();
  console.log('GETTING FRIENDS RESP', response);
  if (response.data.error) {
    return { error: response.error };
  }
  return { friends: response.data };
};
