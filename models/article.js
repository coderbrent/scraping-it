const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

  headline: {
    type: Array,
    required: true
  },
  summary: {
    type: Array,
    required: true
  },
  URL: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;