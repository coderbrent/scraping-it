const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('/Users/brentabruzese/Desktop/projects/scraping-it/models/Article')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/scraper', function(req, res, next) {
  axios.get("www.nyt.com").then(response => {
    const $ = cheerio.load(response.data);
    $("breaking-news").each(function(i, element) {
      const result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      db.Article.create(result).then(dbArticle => {
        console.log(dbArticle)
      });
    });
    res.send('scrape completed')
  })
})


module.exports = router;
