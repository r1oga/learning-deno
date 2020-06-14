import { Router } from './deps.ts'

import * as planets from './models/planets.ts'
import * as launches from './models/launches.ts'

const router = new Router()

router.get('/', ({ response }) => {
  response.body = `
88888b.  8888b. .d8888b  8888b.
888 "88b    "88b88K         "88b
888  888.d888888"Y8888b..d888888
888  888888  888     X88888  888
888  888"Y888888 88888P'"Y888888

      Mission Control API
`
})

router.get('/planets', ({ response }) => {
response.body = planets.getAll()
})

router.get('/launches', ({ response }) => {
response.body = launches.getAll()
})

export default router
