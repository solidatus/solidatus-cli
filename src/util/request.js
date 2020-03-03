const fetch = require('node-fetch')
const HttpsProxyAgent = require('https-proxy-agent')

async function request(args, url, body, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + args.token
  }

  let agent
  if (args.proxy) {
    agent = new HttpsProxyAgent(args.proxy)
  }

  const fullUrl = `${args.host}${url}`

  if (!options.quiet) {
    console.log('>>> REQUEST >>>')
    console.log(`POST ${fullUrl}`)
    console.log(JSON.stringify(body, null, 2))
    console.log('----------')
  }

  return await fetch(`${args.host}${url}`, {
    method: 'POST',
    headers,
    agent,
    body: JSON.stringify(body)
  }).then(function(response) {
    if (!options.quiet) {
      console.log('<<< RESPONSE <<<')
      console.log(`${response.status} ${response.statusText}`)
      const jsonPromise = response.json()
      jsonPromise.then(json => {
        console.log(JSON.stringify(json, null, 2))
        console.log('----------')
      })
      return jsonPromise
    }
    return response
  })
}

module.exports = request
