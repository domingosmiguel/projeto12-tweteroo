import cors from 'cors';
import express from 'express';

const tweets = [{ oi: 'oi' }];
// {
//   username: "bobesponja",
//   tweet: "eu amo o hub"
// }

const users = [];
// {
//   username: 'bobesponja',
//   avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
// }

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', (req, res) => {
  users.push({
    [req.body.username]: req.body.username,
    [req.body.avatar]: req.body.avatar,
  });
  console.log(users);
  res.send('OK');
});

app.listen(5000);
