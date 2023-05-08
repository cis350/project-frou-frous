async function getLeaders() {
  const response = await fetch('/leaderboard');
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }

  const result = await response.json();
  console.log('leaderboard result', result);
  return result;
}

export default getLeaders;
