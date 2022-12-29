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

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model('Article', articleSchema);

app.route('/articles')
    .get(function(req, res){
        Article.find(function(err, results) {
            if (!err) {
                res.send(results);
            } else { res.send(err); }
        });
    })
    .post(function(req, res){
        newArticle = new Article({
            title: (req.body.title).trim(),
            content: req.body.content
        });

        newArticle.save(function(err){
            if (!err) {
                res.send('New article received & added.');
            } else {res.send(err);}
        });
        })
    .delete(function(req, res){
        Article.deleteMany(function(err){
            if (!err){
                res.send("Succesfully deleted collection.");
            } else {res.send(err);}
        });
    });

app.route('/articles/:articleTitle')
    .get(function(req, res){
        Article.findOne({title: req.params.articleTitle}, function(err, result){
            if(result) {
                res.send(result);
            } else if(!result) {res.send(`<h1>${articleTitle} does not exist.</h1>`);}
            else if(err) {res.send(err);}
        });
    })

    .put(function(req, res){
        Article.findOneAndUpdate(
            {title: req.params.articleTitle}, 
            {title: req.body.title, content: req.body.content},
            function(err, result){
                if(!err) {
                    res.send(`${req.params.articleTitle} has been updated.`);
                } else {res.send(err);}
            });
    });

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});