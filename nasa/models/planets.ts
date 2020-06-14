  import {
    join,
    BufReader,
    parse,
    _,
    Application,
    send,
    log
  } from '../deps.ts'

// interface Planet {
//   [key: string]: string
// }

// Planet interface shorthand
type Planet = Record<string, string>

// singleton, cached and and reused for all the modules of the app
// same object is reused on subsequent loads and imports of planets.ts
let planets: Planet[]

export function filterHabitablePlanets(planets: Array<Planet>) {
  return planets.filter(planet => {
    const { koi_prad, koi_disposition, koi_srad } = planet
    return koi_disposition === 'CONFIRMED'
      && +koi_prad > 0.7 && +koi_prad < 1.3
      && +koi_srad > 0.99 && +koi_srad < 1.01
  })
}

async function loadPlanetsData () {
  const path = join('data', 'data.csv')
  const file = await Deno.open(path)
  const bufReader = new BufReader(file)
  const result = await parse(bufReader, {
    header: true,
    comment: '#'
  })
  Deno.close(file.rid)

  const planets = filterHabitablePlanets(result as Array<Planet>)
  return planets.map(planet => _.pick(planet, [
    'kepler_name',
    'koi_prad',
    'koi_disposition',
    'koi_srad',
    'koi_steff',
    'koi_period'
  ]))
}

planets = await loadPlanetsData()
log.info(`${planets.length} habitable planets found`)

// Access layer
export function getAllPlanets() {
  return planets
}
