'use strict'

const cors = require('cors')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const ws = require('./ws')
const api = require('./api')
const charcoal = require('./charcoal')

let wsApp
let apiApp
let staticApp = express()
let internalApp = express()

staticApp.use(cors())
internalApp.use(cors())

staticApp.use(bodyParser.json({strict: false}))
internalApp.use(bodyParser.json({strict: false}))

internalApp.get('/status', (req, res) => res.end('ok'))

if (process.env.API_PORT !== process.env.PORT) {
  apiApp = express()

  apiApp.use(cors())
  apiApp.use(bodyParser.json({strict: false}))
}

if (process.env.WS_PORT !== process.env.API_PORT) {
  wsApp = express()

  wsApp.use(cors())
  wsApp.use(bodyParser.json({strict: false}))
}

staticApp.use(express.static(process.env.STATIC_DIR))

ws(wsApp || apiApp || staticApp, internalApp)
api(apiApp || staticApp, internalApp)

staticApp.get('*', (req, res) => {
  res.sendFile(path.resolve(process.env.STATIC_DIR, process.env.INDEX_FILE))
})

internalApp
  .listen(process.env.INTERNAL_PORT, () => {
    charcoal.info(`Puppy is listening on port ${process.env.INTERNAL_PORT}!`)
  })

staticApp
  .listen(process.env.PORT, () => {
    charcoal.info(`Puppy static is listening on port ${process.env.PORT}!`)
    charcoal.info(`Puppy static dir is: ${process.env.STATIC_DIR}!`)
    charcoal.info(`Puppy static index file: ${process.env.INDEX_FILE}!`)

    if (!apiApp) {
      charcoal.info(`Puppy static api is listening on port ${process.env.PORT}!`)
    }

    if (!apiApp && !wsApp) {
      charcoal.info(`Puppy ws is listening on port ${process.env.PORT}!`)
      charcoal.info(`Puppy ws URL is set to ${process.env.WS_URL}!`)
    }
  })

if (apiApp) {
  apiApp
    .listen(process.env.API_PORT, () => {
      charcoal.info(`Puppy api is listening on port ${process.env.API_PORT}!`)

      if (!wsApp) {
        charcoal.info(`Puppy ws is listening on port ${process.env.API_PORT}!`)
        charcoal.info(`Puppy ws URL is set to ${process.env.API_PORT}!`)
      }
    })
}

if (wsApp) {
  wsApp
    .listen(process.env.WS_PORT, () => {
      charcoal.info(`Puppy ws is listening on port ${process.env.WS_PORT}!`)
      charcoal.info(`Puppy ws URL is set to ${process.env.WS_URL}!`)
    })
}
