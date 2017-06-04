var request = require('./request')
var fs = require('fs')
var cheerio = require('cheerio')

var times = 0
var article = []
var articleType = {
  // 代码数为0的文章
  typeA: 0,
  // 代码数为1~10的文章
  typeB: 0,
  // 代码数为11~20的文章
  typeC: 0,
  // 代码数为11~20的文章
  typeD: 0
}

function SeekDetail() { }

SeekDetail.prototype.createPromise = function (url) {
  var options = {
    url: 'http://www.jianshu.com' + url,
    type: 'get'
  }
  return new Promise((resolve, reject) => {
    request(options, (data, _setCookie) => {
      var $ = cheerio.load(data)
      var title = $('h1.title').text()
      var viewsCount = parseInt(($('.article .author .info .meta .wordage').text()).match(/(\d+)/ig), 10) || 0
      var codes = $('code').length
      // 统计文章数
      if (codes === 0) {
        articleType.typeA++
      } else if (codes < 10) {
        articleType.typeB++
      } else if (codes < 20) {
        articleType.typeC++
      } else {
        articleType.typeD++
      }
      // 把标题和url放入到article
      article.push({
        title: title,
        url: options.url,
        codes: codes,
        viewsCount: viewsCount
      })
      resolve(data)
    })
  })
}

SeekDetail.prototype.seek = function (urls, callback) {
  var self = this
  var promises = []
  for (let i = 0; i < 5; i++) {
    promises.push(self.createPromise(urls[times]))
    times++
    if (times === urls.length) break
  }

  var promise = Promise.all(promises)
  promise.then((result) => {
    console.log('seekDetail', times)
    if (times < urls.length) {
      self.seek(urls, callback);
    } else {
      callback(result);
    }
  })
}


module.exports = function (urls) {
  var seekDetail = new SeekDetail()
  return new Promise((resolve, reject) => {
    seekDetail.seek(urls, (res) => {
      var result = {
        articles: article,
        articleType: articleType
      }
      resolve(result)
    })
  })
}

