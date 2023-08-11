import fs from 'fs'
import https from 'https'
import path from 'path'

import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import expressOasGenerator, {
  SPEC_OUTPUT_FILE_BEHAVIOR,
  SwaggerUiOptions,
} from 'express-oas-generator'
import morgan from 'morgan'

import router from './api'
import { Cron } from './cron'
import Logger from './lib/Logger'

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'
const isProd = env === 'production'
// .env file path resolve different between dev and production.
// dev: projectRoot/.env production: projectRoot/server_build/.env

require('dotenv').config(
  isProd ? path.join(__dirname, './../../.env') : __dirname,
)

Cron.readingList.start()

/**
 Express Setup
 */
const app = express()
if (isDev) {
  // OpenAPI Spec Generator
  expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: false,
    specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
    swaggerDocumentOptions: SwaggerUiOptions,
  })
}
app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(morgan('combined'))
app.use(compression())
app.use('/api', router)
/**
 DEV Server
 */
if (isDev) {
  expressOasGenerator.handleRequests()
  app.listen(4000, () => {
    Logger.log()
    Logger.info('DEV API Server listening on port 4000!')
  })
} else if (isProd) {
  /**
   Prod Server
   */
  app.use('', express.static(path.join(__dirname, './../../build')))
  app.use('/', express.static(path.join(__dirname, './../../build')))

  // Handle DirectLink
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, './../../build/index.html'))
  })

  const privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/nsx.malloc.tokyo/privkey.pem',
    'utf-8',
  )
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/nsx.malloc.tokyo/cert.pem',
    'utf-8',
  )
  const ca = fs.readFileSync(
    '/etc/letsencrypt/live/nsx.malloc.tokyo/chain.pem',
    'utf-8',
  )

  const ProdServer = https.createServer(
    { ca: ca, cert: certificate, key: privateKey },
    app,
  )

  ProdServer.listen(443, () => {
    Logger.log()
    Logger.info('Production Server listening on port 443!')
  })
} else {
  Logger.error('process.env.NODE_ENV is not defined <development|production>')
  process.exit(1)
}
