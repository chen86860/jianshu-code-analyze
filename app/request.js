var http = require('http')
var url = require('url')
var quesystring = require('querystring')

// options: {
//   url: '',
//   type: 'get',
//   parms:{ }
// }


module.exports = (options, callback) => {
  var URL = url.parse(options.url)
  var method = options.type.toUpperCase() || 'GET'

  var parms = false
  if (options.parms) {
    var parms = quesystring.stringify(options.parms)
  }

  var path = URL.path
  if (method === 'GET' && parms) {
    path = path + '?' + parms
  }

  var requestOption = {
    host: URL.host,
    port: URL.port,
    path: path,
    method: method,
    header: {
      Cookie: options.cookie || ''
    }
  }

  // POST方法则要设置请求头部
  if (method === 'POST' && parms) {
    requestOptions.headers['Content-Type'] = 'application/x-www-form-urlencodeed'
    requestOptions.headers['Content-Length'] = contents.length
  }
  var req = http.request(requestOption, (res) => {
    res.setEncoding('UTF-8')
    var str = ''
    res.on('data', (chunk) => {
      str += chunk
    })
    res.on('end', _ => {
      var setCookie = res.headers['set-cookie'] || ''
      callback(str, setCookie)
    })
    res.on('error', (e) => {
      callback(e)
    })
  })

  req.on('error', (e) => {
    callback(e)
  })

  if (method === 'POST' && parms) {
    req.write(parms)
  }

  req.end()
}