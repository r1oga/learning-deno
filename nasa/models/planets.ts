  import { join } from 'https://deno.land/std/path/mod.ts'
import { BufReader } from 'https://deno.land/std/io/bufio.ts'
import { parse } from 'https://deno.land/std/encoding/csv.ts'
import * as _ from 'https://deno.land/x/lodash@4.17.15-es/lodash.js'

interface Planet {
  [key: string]: string
}

let planets: Planet[]

async function loadPlanetsData () {
  const path = join('data', 'data.csv')
  const file = await Deno.open(path)
  const bufReader = new BufReader(file)
  const result = await parse(bufReader, {
    header: true,
    comment: '#'
  })
  Deno.close(file.rid)

  const planets = (result as Array<Planet>).filter(planet => {
    const { koi_prad, koi_disposition, koi_srad } = planet
    return koi_disposition === 'CONFIRMED'
      && +koi_prad > 0.7 && +koi_prad < 1.3
      && +koi_srad > 0.99 && +koi_srad < 1.01
  })
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
console.log(`${planets.length} habitable planets found`)

// Access layer
export function getAllPlanets() {
  return planets
}
