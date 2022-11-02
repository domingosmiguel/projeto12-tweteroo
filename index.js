import express from "express";

const tweets = [];

const app = express();

app.get("/forecast", (req, res) => {
  forecast.forEach((obj) => {
    obj.views++;
  });
  res.send(forecast);
});

app.get("/forecast/:day", (req, res) => {
  const wantedDay = forecast.find(
    (obj) => `${obj.day}` === `${req.params.day}`
  );
  wantedDay.views++;
  res.send(wantedDay);
});
// configura o servidor pra rodar na porta 5000
app.listen(5000);
