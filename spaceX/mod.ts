const downloadLaunchData = async () => {
  const res= await fetch('https://api.spacexdata.com/v3/launches', {
    method: 'GET'
  })

  const data = await res.json()
  console.log(data)
}

await downloadLaunchData()
