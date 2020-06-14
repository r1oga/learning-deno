import { Application, send } from 'https://deno.land/x/oak@v5.2.0/mod.ts'
import * as log from 'https://deno.land/std/log/mod.ts'

const app = new Application()
const PORT = 8000

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

app.use(async ctx => {


  await send(
    ctx,
    ctx.request.url.pathname,
    { root: `${Deno.cwd()}/public` }
  )
})

app.use(async ({ response }, next) => {
  response.body = `
88888b.  8888b. .d8888b  8888b.
888 "88b    "88b88K         "88b
888  888.d888888"Y8888b..d888888
888  888888  888     X88888  888
888  888"Y888888 88888P'"Y888888

      Mission Control API
`
  await next()
})

// only if executed as a program instead of imported as a module
if (import.meta.main) {
  app.listen({ port: PORT })
}
