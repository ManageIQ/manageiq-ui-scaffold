var architect = require('architect')
var path = require('path')

var configPath = path.join(__dirname, 'config.js')
var config = architect.loadConfig(configPath)

architect.createApp(config, function (err, app) {
  if (err) throw err
  console.log('ManageIQ pluggable UI started OK!')
})
