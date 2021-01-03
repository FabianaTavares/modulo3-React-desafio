import axios from 'axios';

const API_URL = 'http://localhost:3001/tweets/';

const TWEET_VALIDATION = [
    {
      id: "f0057d0c-19ef-421f-9b87-14995591a134",
      value: "Faça o computador trabalhar para você."
    },
    {
      id: "3772e6c0-dc53-4592-950e-33fa1805ca33",
      value: "É impossível abraçar o mundo."
    },
    {
      id: "7c1033be-bc9d-4526-84d5-9cebe343062d",
      value: "Angular, React e Vue são excelentes ferramentas para desenvolvimento Front End."
    }
];

async function getAllTwitters() {
  const res = await axios.get(API_URL);
  console.log(res);
  const twitters = res.data.map((tweet) => {
    const { id, value } = tweet;

    return {
      ...tweet,
      isDeleted: false,
    };
  });

  let allTweets = new Set();
  twitters.forEach((tweet) => allTweets.add(tweet));
  allTweets = Array.from(allTweets);

  return allTweets;
}

async function insertTweet(tweet) {
  const response = await axios.post(API_URL, tweet);
  return response.data.id;
}

async function deleteTweet(id) {
  console.log(id);
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}

async function getValidationFromTweet(tweetType) {
  const tweetValidation = TWEET_VALIDATION.find(
    (item) => item.tweetType === tweetType
  );

  const { minValue, maxValue } = tweetValidation;

  return {
    minValue,
    maxValue,
  };
}

export {
  getAllTwitters,
  insertTweet,
  deleteTweet,
  getValidationFromTweet
}