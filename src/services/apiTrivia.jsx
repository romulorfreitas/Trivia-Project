const getCurrentValue = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await response.json();

  return Promise.resolve(json);
};

export const triviaRequest = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();

  return Promise.resolve(json);
};

export default getCurrentValue;
