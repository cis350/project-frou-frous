async function getLeaders() {
  const response = await fetch('http://localhost:5000/leaderboard');
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }

  const result = await response.json();
  console.log('result');
  console.log(result);
  return result;
}

export default getLeaders;
