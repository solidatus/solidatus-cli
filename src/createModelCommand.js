const request = require('./util/request')

async function createModels(argv) {
  for (var i = 1; i <= argv.n; i++) {
    const body = {
      name: `Model | ${i} | ${new Date().toISOString()}`
    }
    await request(argv, '/api/v1/models', body, { quiet: true })
  }
}

module.exports = argv => {
  createModels(argv).then(() => {
    console.log(`Created ${argv.n} models`)
  })
}
