const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  URL: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;