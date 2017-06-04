var superagent = require('superagent')

var browserHeader = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
  'Content-Type': 'application/x-www-form-urlencoded'
}

function getLoginCookie(userid, pwd) {
  userid = userid.toUpperCase()
  return new Promise((resolve, reject) => {
    superagent.post(url.login_url).set(browserHeader).send({
      userid: userid,
      pwd: pwd,
      timezoneOffset: '0'
    }).redirects(0).end((err, res) => {
      var cookie = response.headers['set-cookie']
      resolve(cookie)
    })
  })
}

function getData(cookie) {
  return new Promise(function (resolve, reject) {
    //传入cookie
    superagent.get(url.target_url).set("Cookie", cookie).set(browserMsg).end(function (err, res) {
      var $ = cheerio.load(res.text);
      resolve({
        cookie: cookie,
        doc: $
      });
    });
  });
}