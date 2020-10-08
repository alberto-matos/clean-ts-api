module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.2.10',
      skipMD5: true
    },
    autoStart: false,
    instance: {
      dbName: 'jest'
    }
  }
}
