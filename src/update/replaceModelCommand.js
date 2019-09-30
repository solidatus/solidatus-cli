const loadJson = require('../util/loadJson')
const request = require('../util/request')

module.exports = argv => {
  let comparator

  if (argv.comparatorProperty) {
    comparator = { property: argv.comparatorProperty }
  } else if (argv.comparator) {
    comparator = {
      [argv.comparator]: true
    }
  }

  const body = {
    cmds: [
      {
        cmd: 'ReplaceModel',
        model: loadJson(argv.input),
        comparator
      }
    ],
    commit: true,
    commitMessage: 'ReplaceModel from Solidatus CLI',
    expectDraft: false
  }

  request(argv, `/api/v1/models/${argv.model}/update`, body).then(response => {})
}
