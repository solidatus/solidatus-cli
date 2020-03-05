const fetch = require('node-fetch')
const HttpsProxyAgent = require('https-proxy-agent')
const _ = require('lodash')

async function request(args, url, body, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + args.token
  }

  _.defaults(options, { method: 'POST' })

  let agent
  if (args.proxy) {
    agent = new HttpsProxyAgent(args.proxy)
  }

  const fullUrl = `${args.host}${url}`

  if (!options.quiet) {
    console.log('>>> REQUEST >>>')
    console.log(`${options.method} ${fullUrl}`)
    console.log(JSON.stringify(body, null, 2))
    console.log('----------')
  }

  const response = await fetch(`${args.host}${url}`, {
    method: options.method,
    headers,
    agent,
    body: body && JSON.stringify(body)
  })

  const json = await response.json()

  if (!options.quiet) {
    console.log('<<< RESPONSE <<<')
    console.log(`${response.status} ${response.statusText}`)
    console.log(JSON.stringify(json, null, 2))
    console.log('----------')
  }

  return json
}

module.exports = request
