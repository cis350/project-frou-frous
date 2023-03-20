import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

mock.onGet('/chat').reply(200, {
  friends: [
    {
      message: 'hello hello',
      friend: 'John Doe',
      friendImage: 'https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg',
      timestamp: 1679326514,
    },
    {
      message: "Can't believe you skipped",
      friend: 'John Smith',
      friendImage: 'https://keepthetech.com/wp-content/uploads/2020/12/picture-36.jpg.webp',
      timestamp: 1679240114,
    },
    {
      message: 'Heyyyyy',
      friend: 'Frous Frous',
      friendImage: 'https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg',
      timestamp: 1679229314,
    },
    {
      message: ':)',
      friend: 'Jane',
      friendImage: 'https://th.bing.com/th/id/R.10e03b02b07e1574ee9733956feeebc2?rik=xUUSxf26ZbQZ0w&riu=http%3a%2f%2fwww.newsshare.in%2fwp-content%2fuploads%2f2%2fProfile-WhatsApp-DP-27.jpg&ehk=JuGiHHA%2fSBHcKVqqCJBOSsrT2m44V9%2f%2bTfJzFKtSGF0%3d&risl=&pid=ImgRaw&r=0',
      timestamp: 1679142914,
    },
  ],
});

const mes = [
  {
    message: 'hello hello',
    sent: false,
  },
  {
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nulla tristique diam vel libero lobortis, in faucibus elit
    vulputate. Maecenas lacinia, sapien sit amet auctor
    pulvinar,nisl leo tincidunt nibh`,
    sent: false,
  },
  {
    message: 'Lorem ipsum dolor sit amet',
    sent: true,
  },
  {
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nulla tristique diam vel libero lobortis`,
    sent: true,
  },
  {
    message: 'Lorem ipsum',
    sent: true,
  },
  {
    message: 'Lorem ipsum dolor',
    sent: false,
  },
  {
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nulla tristique diam vel libero lobortis, in faucibus elit
    vulputate. Maecenas lacinia, sapien sit amet auctor
    pulvinar,nisl leo tincidunt nibh`,
    sent: false,
  },
  {
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    sent: true,
  },
];
const pathRegex = new RegExp('\/chat\/user\/*'); // eslint-disable-line
mock.onGet(pathRegex).reply(200, { // eslint-disable-line
  messages: mes,
});

const postRegex = new RegExp('\/chat\/send\/*'); // eslint-disable-line
mock.onPost(postRegex).reply(200, {});

export const getChatFriends = async () => { // eslint-disable-line
  const res = await axios.get('/chat');
  return res.data;
};

export async function getChatMessages(user) {
  console.log(user);
  const res = await axios.get(`/chat/user/${user}`);
  return res.data;
}

export async function sendChatMessage(message) {
  console.log(message);
  const res = await axios.post(`/chat/send/${message}`);
  mes.push({
    message,
    sent: true,
  });
  return res.data;
}
