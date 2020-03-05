const request = require('./util/request')
const loadCsv = require('./util/loadCsv')
const _ = require('lodash')

/**
 * Applies properties from a CSV file to entities in a model by looking up those entities based on a property (also in the CSV)
 */
async function applyPropertiesCommand(argv) {
  // Fetch the model data
  const modelResponse = await request(argv, `/api/v1/models/${argv.model}/load`, null, {
    quiet: true,
    method: 'GET'
  })

  // Load and parse the CSV file
  const csv = loadCsv(argv.input)

  // Create lookup of entities based on the ID property
  const idColumn = argv['id-column']
  const entitiesByUserId = _.groupBy(
    modelResponse.data.entities,
    e => (e.properties && e.properties[idColumn]) || null
  )

  // Generate the SetProperty commands
  const cmds = []
  _.each(csv, (row, i) => {
    const id = row[idColumn]
    const entities = entitiesByUserId[id]
    if (_.isEmpty(entities)) {
      console.warn(`Row ${i + 1}: Could not find entity with property '${idColumn}' = '${id}'`)
      return
    }

    // Found the entity (or entities!) in the model
    // Now for each of the properties in the row
    _.each(row, (value, key) => {
      if (key == idColumn) {
        return
      }

      // Add the command to the list for each of the matched entities
      _.each(entities, entity => {
        cmds.push({
          cmd: 'SetProperty',
          id: entity.id,
          propertyName: `${key}`,
          propertyValue: `${value}`
        })
      })
    })
  })

  // Construct the API request
  const body = {
    cmds: cmds,
    commit: true,
    commitMessage: `Apply properties from CSV file using Solidatus CLI`,
    expectDraft: false
  }

  // Update the model
  await request(argv, `/api/v1/models/${argv.model}/update`, body)
}

module.exports = argv => {
  applyPropertiesCommand(argv).then(() => {
    console.log(`Finished applying properties`)
  })
}
