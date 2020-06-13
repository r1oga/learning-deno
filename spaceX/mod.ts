import * as log from 'https://deno.land/std/log/mod.ts'
import * as _ from 'https://deno.land/x/lodash@4.17.15-es/lodash.js'

interface Launch {
  flightNumber: number,
  mission: string,
  rocket: string,
  customers: string[]
}

const launches = new Map<number, Launch>()

const downloadLaunchData = async () => {
  log.info('Downloading launch data...')
  const res= await fetch('https://api.spacexdata.com/v3/launches', {
    method: 'GET'
  })

  if (!res.ok) {
    log.warning('Problem downloading lauch data')
    throw new Error('Lauch data download failed')
  }
  const data = await res.json()
  for (const launch of data) {
    const {
      flight_number: flightNumber,
      mission_name: mission,
      rocket: { rocket_name: rocket, second_stage: { payloads } },
     } = launch

    const customers = _.flatMap(payloads, (payload: any) => payload['customers'])

    const flight_data = { flightNumber, mission, rocket, customers }
    launches.set(flightNumber, flight_data)
    log.info(`${flightNumber}: ${JSON.stringify(flight_data)}`)
  }
}

await downloadLaunchData()

// log.debug("Hello world");
// log.info(123456);
// log.warning(true);
// log.error({ foo: "bar", fizz: "bazz" });
// log.critical("500 Internal server error");

// test a POST request
// const res = await fetch('https://reqres.in/api/users', {
//   method: 'POST',
//   headers: {  "Content-Type": "application/json" },
//   body: JSON.stringify({
//     name: "Elon Musk",
//     job: "billionaire"
//   })
// })
//
// const data = await res.json()
// console.log(data)
