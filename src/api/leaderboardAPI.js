function getLeaders(callback) {
  fetch('http://localhost:8000/leaderboard')
    .then((res) => res.json()).then((resp) => {
      callback(resp);
    }).catch((err) => {
      callback({ error: err });
    });
}

export default getLeaders;
