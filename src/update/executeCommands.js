const loadJson = require('../util/loadJson')
const request = require('../util/request')

module.exports = argv => {
  const body = loadJson(argv.input)

  body['commit'] = true
  body['commitMessage'] = 'Execute commands from Solidatus CLI'
  body['expectDraft'] = false

  request(argv, `/api/v1/models/${argv.model}/update`, body).then(response => {})
}

// json should be of form
//
// {
//    cmds: []
// }
