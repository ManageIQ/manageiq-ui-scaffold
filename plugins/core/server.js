module.exports = function (options, imports, register) {
  var express = require('express')
  var path = require('path')
  var favicon = require('serve-favicon')
  var logger = require('morgan')
  var cookieParser = require('cookie-parser')
  var bodyParser = require('body-parser')
  var fs = require('fs')
  var hbs = require('hbs')
  var app = express()
  var _ = require('lodash') // need to add to "core" plugin dependancies

  // Our default route -> maybe we should do a redirect to something else??  Maybe a default plugin?
  var index = require('./routes/index')

  // view engine setup
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'hbs')

  // uncomment after placing your favicon in /public
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))

  // TODO - We need to make a lot of helper methods for other plugins to use - maybe a "plugin controller" plugin that
  // both controls the plguins and provides helpers???

  app.use('/', index)

  var sidebarHtml = ''

  // Load the routes / sidebars for enabled plugins
  options.consumes.forEach(function (item) {
    var pluginName = _.replace(item, 'Router', '')
    var pluginLoc = path.join(__dirname, '../' + pluginName)

    if (_.includes(item, 'Router')) {
      // Load the routes
      imports[item](app)

      // Load the public dir, if it exists
      publicPath = pluginLoc + '/public'
      if (fs.existsSync(publicPath)) {
        app.use(express.static(publicPath))
      }
    }

    if (_.includes(item, 'Sidebar')) {
      hbs.registerPartial('sidebar', sidebarHtml += imports[item]())
    }
  })

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  app.use(function (err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error')
  })

  var port = options.port
  var host = options.host
  app.listen(port, host, function () {
    console.log('Server started at http://' + host + ':' + port)
  })

  register(null, {
    onDestruct: function (callback) {
      app.close(callback)
      console.log('Express server stopped')
    },
    server: app
  })
}
