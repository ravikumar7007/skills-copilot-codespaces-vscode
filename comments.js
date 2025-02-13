//Create web server
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const comments = require('./comments');
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

//API
app.get('/api/comments', (req, res) => {
  comments.getComments()
    .then(comments => {
      res.json(comments);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.post('/api/comments', (req, res) => {
  comments.addComment(req.body)
    .then(comment => {
      res.json(comment);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

//Start server
app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});