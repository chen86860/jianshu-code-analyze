var http = require('http')
var server = http.Server()

server.on('request', (req, res) => {
  var url = req.url
  res.write('Hello world!' + req);
  res.end();
})


server.listen(3002)
