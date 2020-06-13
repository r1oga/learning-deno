const downloadLaunchData = async () => {
  const res= await fetch('https://api.spacexdata.com/v3/launches', {
    method: 'GET'
  })

  const data = await res.json()
  console.log(data)
}

await downloadLaunchData()

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
