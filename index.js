var analyse = require('./app/analyse')
var bs = require("browser-sync").create()

var before = new Date()
analyse(() => {
  var end = new Date()
  var time = ((end.getTime() - before.getTime())) / 1000
  console.log('总耗时：' + time + 's')
  bs.init({
    baseDir: "./",
    server: './app/views/',
    index: "index.html",
    port: 8089
  })
  bs.reload("./app/views/*.html")
})