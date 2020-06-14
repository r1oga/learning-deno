import { Application, send, log } from './deps.ts'

import router from './router.ts'

const app = new Application()
const PORT = 8000

await log.setup({
  handlers: { console: new log.handlers.ConsoleHandler('INFO') },
  loggers: {
    default: {
      level: 'INFO',
      handlers: ['console']
    }
  }
})

app.use(async ({ request, response }, next) => {
  await next()
  const time = response.headers.get('X-Response-Time')
  log.info(`${request.method} ${request.url}: ${time}`)
})

app.use(async ({ response }, next) => {
  const start = Date.now()
  await next()
  // delta is calculated after the next() promise resolves.
  // ie after the response body is set and returned
  const delta = Date.now() - start
  response.headers.set('X-Response-Time', `${delta}ms`)
})

// needs to be before next middleware so that api catches it
app.use(router.routes())
// be specific about not allowed methods
app.use(router.allowedMethods())

app.use(async ctx => {
  const filePath = ctx.request.url.pathname
  const fileWhiteList = [
    '/index.html',
    '/javascripts/script.js',
    '/stylesheets/style.css',
    '/images/favicon.png'
  ]

  if (fileWhiteList.includes(filePath)) {
    await send(ctx, filePath, { root: `${Deno.cwd()}/public` })
  }
})


// only if executed as a program instead of imported as a module
if (import.meta.main) {
  log.info(`Starting server on port ${PORT}...`)
  app.listen({ port: PORT })
}
