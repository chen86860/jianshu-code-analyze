var http = require('http')

var client = http.get('http://localhost:3000', (res) => {
  res.pipe(process.stdout)
})