var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API in conjuntion with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    res.json(JSON.parse(data))
  })
})

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    var comments = JSON.parse(data)

    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text
    }
    comments.push(newComment)
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), function(err) {
      if (err) {
        console.log(err)
        process.exit(1)
      }

      res.json(comments)
    })
  })
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
