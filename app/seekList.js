var request = require('./request')
var cheerio = require('cheerio')
var fs = require('fs')

var times = 0
var totalPage = 4
var urls = []

function Seek() { }

Seek.prototype.createPromist = function (i) {
  var options = {
    url: 'http://www.jianshu.com/c/NEt52a?order_by=added_at&page=' + i,
    type: 'get'
  }
  return new Promise((resolve, reject) => {
    request(options, (data, _setCookie) => {
      resolve(data)
    })
  })
}

// 并发请求5个连接
Seek.prototype.seek = function (callback) {
  var self = this
  times++
  var ot = times
  var promise = Promise.all([
    self.createPromist(times),
    self.createPromist(++times),
    self.createPromist(++times),
    self.createPromist(++times),
    self.createPromist(++times)
  ])
  promise.then((result) => {
    console.log('seekList: ', times)
    result.forEach((e, i, a) => {
      let $ = cheerio.load(e);
      $("a[class=title]").each(function (index, ee) {
        urls.push(ee.attribs.href)
      })
    })
    if (times < totalPage) {
      self.seek(callback)
    } else {
      callback(urls)
    }
  })
}

module.exports = function () {
  var seek = new Seek()
  return new Promise((resolve, reject) => {
    seek.seek((data) => {
      resolve(data)
    })
  })
}