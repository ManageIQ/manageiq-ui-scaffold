module.exports = function setup (options, imports, register) {
  var path = require('path')
  var fs = require('fs')
  function definePlugin (app) {
    console.log('dashboard plugin loaded OK!')
    app.get('/dashboard', (req, res, next) => {
      res.render(path.join(__dirname, '/views/index'), { title: 'Page Title - hello' })
    })
  }

  function defineSidebar () {
    return fs.readFileSync(path.join(__dirname, '/views/sidebar.hbs'), {encoding: 'utf-8'})
  }

  register(null, {
    dashboardRouter: definePlugin,
    dashboardSidebar: defineSidebar
  })
}
