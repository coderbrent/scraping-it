const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios')
const db = require('../models')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/scraper', function(req, res, next) {
  axios.get("http://www.weeklyworldnews.com").then(function(response) {
    const $ = cheerio.load(response.data);
    const arrResults = [], result = {}

      $("#ad-takeover").each(function(i, el) {
        result.headline = $(this).find(".entry-title")
        .text()
        result.summary = $(this).find(".entry-excerpt")
        .text()
        
        console.log(result)
        arrResults.push(result);
      });
      return arrResults;
    }).then(function(data) {
      db.Article.create(data).then(dbArticle => {
        console.log('this was added: ' + dbArticle)
      })
    })
    
  })


router.get('/db', function(req, res, next) {
  db.Article.find({}).then(allArticles => {
    res.json(allArticles)
  })

router.get()


})

module.exports = router;
