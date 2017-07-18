module.exports = function setup (options, imports, register) {
  var path = require('path')
  var fs = require('fs')
  function definePlugin (app) {
    console.log('catalog plugin loaded OK!')
    app.get('/catalog', (req, res, next) => {
      res.render(path.join(__dirname, '/views/index'), { title: 'Page Title - catalog' })
    })
  }

  function defineSidebar () {
    return fs.readFileSync(path.join(__dirname, '/views/sidebar.hbs'), {encoding: 'utf-8'})
  }

  register(null, {
    catalogRouter: definePlugin,
    catalogSidebar: defineSidebar
  })
}
