const yargs = require('yargs')
const fetch = require('node-fetch')
const ProxyAgent = require('proxy-agent')
const _ = require('lodash')

function _checkStatusAndGetJson(response) {
  if (response.ok) {
    console.log('Request returned with ' + response.status)
    return response.json()
  } else {
    console.log('Solidatus API error:')
    throw new Error(response.status + ': ' + response.statusText)
  }
}

async function fetchRequest(url, body, headers, proxy) {
  await fetch(url, {
    method: 'post',
    agent: proxy || undefined,
    headers,
    body
  })
    .then(_checkStatusAndGetJson)
    .catch(function(error) {
      throw new Error(error)
    })
}

module.exports = argv => {
  let agent = null

  if (argv['proxy']) {
    console.log('Using proxy URL for Solidatus API: ' + argv['proxy'])
    agent = new ProxyAgent(argv['proxy'])
  }

  if (argv['nodeExtraCACerts']) {
    console.log('Using extra CA certs')
    process.env.NODE_EXTRA_CA_CERTS = argv['nodeExtraCACerts']
  }

  const url = `${argv['host']}/api/v1/models/${argv['modelId']}/update`
  const body = `{"cmds": ${argv['cmds']},"commit": true, commitMessage: "Update model from script",}`
  const headers = { Authorization: 'Bearer ' + argv['token'], 'Content-Type': 'application/json' }

  fetchRequest(url, body, headers, agent)
}
