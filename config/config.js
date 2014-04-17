var url = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/myapp';

module.exports = {
  url : url,
  nlpApi : 'http://localhost:55066/api/nlp'
};