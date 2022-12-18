const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose  = require('mongoose');

port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articlesSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model('Article', articlesSchema);

app.get('/', function(req, res){
    res.send('hello world!');
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});