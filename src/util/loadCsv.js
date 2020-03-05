const fs = require('fs')
const parse = require('csv-parse/lib/sync')

module.exports = path => {
  // Read file as string
  const rawdata = fs.readFileSync(path)

  // Parse CSV into an array
  const records = parse(rawdata, {
    columns: true,
    skip_empty_lines: true,
    bom: true
  })
  return records
}
