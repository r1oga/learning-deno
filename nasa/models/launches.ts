import { log, _ } from '../deps.ts'

interface Launch {
  flightNumber: number,
  mission: string,
  rocket: string,
  customers: string[],
  launchDate: number,
  upcoming: boolean,
  success?: boolean,
  target?: string
}

const launches = new Map<number, Launch>()

export const downloadLaunchData = async () => {
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
      rocket: { rocket_name: rocket, second_stage: { payloads },
      launch_date_unix: launchDate },
      upcoming,
      launch_success: success
     } = launch

    const customers = _.flatMap(payloads, (payload: any) => payload['customers'])

    const flight_data = {
      flightNumber,
      mission,
      rocket,
      customers,
      launchDate,
      upcoming,
      success
    }
    launches.set(flightNumber, flight_data)
  }
}

await downloadLaunchData()
log.info(`Downloaded data for ${launches.size} SpaceX launches`)

// Access layer
export function getAll() {
  return Array.from(launches.values())
}
