import { assertEquals, assertNotEquals } from 'https://deno.land/std/testing/asserts.ts'

import { filterHabitablePlanets } from '../models/planets.ts'

const EARTH = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1',
  koi_srad: '1'
}
const NOT_CONFIRMED = { koi_disposition: 'FALSE POSITIVE' }
const TOO_LARGE_PRAD = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1.5',
  koi_srad: '1'
}
const TOO_LARGE_SRAD = {
  koi_disposition: 'CONFIRMED',
  koi_prad: '1',
  koi_srad: '1.01'
}

Deno.test('filter only habitable planets', () => {
  const filtered = filterHabitablePlanets([
    EARTH,
    NOT_CONFIRMED,
    TOO_LARGE_PRAD,
    TOO_LARGE_SRAD
  ])
  assertEquals(filtered, [EARTH])
})
