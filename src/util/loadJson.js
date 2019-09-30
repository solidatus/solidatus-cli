const fs = require('fs')

module.exports = path => {
  const rawdata = fs.readFileSync(path)
  return JSON.parse(rawdata)
}
