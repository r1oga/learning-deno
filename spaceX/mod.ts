import * as log from 'https://deno.land/std/log/mod.ts'

interface Launch {
  flightNumber: number,
  mission: string
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
    launches.set(launch['flight_number'], launch['mission_name'])
    log.info(`${launch['flight_number']}: ${launch['mission_name']}`)
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
