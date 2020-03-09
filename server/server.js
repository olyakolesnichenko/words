var express = require('express');
var app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/word', function (req, res) {
  const words = [
    {'word': 'eternity', 'translation': 'вечность'},
    {'word': 'passion', 'translation': 'страсть'},
    {'word': 'smile', 'translation': 'улыбка'},
    {'word': 'fantastic', 'translation': 'фантастика'},
    {'word': 'destiny', 'translation': 'судьба'},
    {'word': 'freedom', 'translation': 'свобода'},
    {'word': 'liberty', 'translation': 'свобода'},
    {'word': 'tranquility', 'translation': 'спокойствие'}];
  res.status(200).json({word: words[Math.floor(Math.random() * words.length)]});
});
app.post('/answer', function (req, res) {
  const answerData = req.body;
  console.log(req.body);
  res.status(200).json({result: true});
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

