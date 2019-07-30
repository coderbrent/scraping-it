const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios')
const Article = require('../models/Article')
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
        .text().split("!")
        result.summary = $(this).find(".entry-excerpt")
        .text().split("\n\t\t\t")
        arrResults.push(result);
      });
      console.log(arrResults)
      return arrResults;
    }).then(function(data) {
      db.Article.create(data).then(dbArticle => {
      })
    })
    
  })


router.get('/all', function(req, res, next) {
  db.Article.find({}).then(allArticles => {
    res.json(allArticles)
  })

router.get('/db', function(req, res, next) {
  db.Article.find({}).then(allArticles => {
    for(i=0; i < allArticles.length; i++) {
      let articles = {
        headline: allArticles[i].headline[i],
        summary: allArticles[i].summary[i]
      }
      console.log(articles)
    }
   
  })
})
 

})

module.exports = router;
