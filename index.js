import cors from 'cors';
import express from 'express';
import { validTweet, validUser } from './validateData.js';

const tweets = [];
const users = [];
const objectLiteralUsers = {};
const tweetsPerPage = 10;
const postSuccess = {
  code: 201,
  message: 'OK',
};
const invalidPage = {
  code: 400,
  message: 'Informe uma página válida!',
};
const invalidPost = {
  code: 400,
  message: 'Todos os campos são obrigatórios!',
};

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', async (req, res) => {
  const { username, avatar } = req.body;
  const { valid } = await validUser(username, avatar);
  if (!valid) {
    res.status(invalidPost.code).send(invalidPost.message);
  } else {
    users.push({
      username,
      avatar,
    });
    objectLiteralUsers[username] = avatar;
    res.status(postSuccess.code).send(postSuccess.message);
  }
});

app.post('/tweets', async (req, res) => {
  const username = req.get('User');
  const { tweet } = req.body;
  const { valid } = await validTweet(username, tweet);
  if (!valid) {
    return res.status(invalidPost.code).send(invalidPost.message);
  }
  tweets.unshift({
    username,
    tweet,
  });
  return res.status(postSuccess.code).send(postSuccess.message);
});

app.get('/tweets', (req, res) => {
  const { page } = req.query;
  if (page <= 0) {
    res.status(invalidPage.code).send(invalidPage.message);
  } else {
    const lastPage = page === 1 ? 0 : (page - 1) * tweetsPerPage;
    const thisPage = page * tweetsPerPage;
    const tweetsToShow = tweets.reduce((tweetArray, tweet, index) => {
      if (lastPage <= index && index < thisPage) {
        tweetArray.push({
          ...tweet,
          avatar: objectLiteralUsers[`${tweet.username}`],
          // avatar: objectLiteralUsers.username,
        });
      }
      return tweetArray;
    }, []);
    res.send(tweetsToShow);
  }
});

app.get('/tweets/:username', (req, res) => {
  const { username } = req.params;
  const userExists = tweets.some((tweet) => tweet.username === username);
  if (!userExists) {
    res.sendStatus(invalidPage.code);
  } else {
    const userTweets = tweets.reduce((tweetArray, tweet) => {
      if (tweet.username === username) {
        tweetArray.push({
          ...tweet,
          avatar: objectLiteralUsers[`${tweet.username}`],
        });
      }
      return tweetArray;
    }, []);
    res.send(userTweets);
  }
});

app.listen(5000);
