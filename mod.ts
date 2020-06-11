import { join } from 'https://deno.land/std/path/mod.ts'

async function readFile () {
  const path = join('txt_files', 'hello.txt')
  const data = await Deno.readTextFile(path)
  console.log(data)
}

// feature of typescript: no need to wrap this in a async function or a Promise
// top level await only available in Node > v14
await readFile()

function readFileSync() {
  console.log('sync:')
  const data = Deno.readTextFileSync('./hello.txt')
  console.log(data)
}

// readFileSync()

async function ls() {
  for await (const dirEntry of Deno.readDir('.')) {
      console.log(dirEntry.name)
  }
}

// await ls()
