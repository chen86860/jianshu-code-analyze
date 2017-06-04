var seekUrls = require('./seekList')
var seekDetail = require('./seekDetail')
var cheerio = require('cheerio')
var nunjucks = require('nunjucks')
var fs = require('fs')

function Analyse() { }

Analyse.prototype.analyse = function (callback) {
  var self = this
  seekUrls().then((data) => {
    seekDetail(data).then((res) => {
      var renderRes = nunjucks.render('./app/tpl/index.tpl', res)
      fs.writeFile('./app/views/index.html', renderRes, _ => { })
      callback && callback()
    })
  })
}

module.exports = function (callback) {
  new Analyse().analyse(callback);
}
