module.exports = [
  {
    packagePath: './plugins/core',
    root: 'core',
    port: process.env.PORT || 3000,
    host: process.env.IP || '0.0.0.0'
  },
  './plugins/hello',
  './plugins/catalog',
  './plugins/orders',
  './plugins/services',
  './plugins/dashboard'
]
