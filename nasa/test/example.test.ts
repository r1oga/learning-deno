import { assertEquals, assertNotEquals } from 'https://deno.land/std/testing/asserts.ts'

// shorthand
Deno.test('Example test', () => {
    assertEquals('deno', 'deno')
    assertNotEquals({ runtime: 'deno'}, { runtime: 'node'})
})

Deno.test({
  name: 'Example os test',
  ignore: Deno.build.os === 'linux',
  fn () {
    assertEquals('deno', 'deno')
    assertNotEquals({ runtime: 'deno'}, { runtime: 'nde'})
  }
})

// Force not checking for ops leaks
Deno.test({
  name: 'Example ops leak',
  sanitizeOps: false,
  fn() {
    setTimeout(() => console.log('Async op'), 1000)
  }
})

// Force not checking for resource leaks (not closing files)
Deno.test({
  name: 'Example resource leak',
  sanitizeResources: false,
  async fn() {
    await Deno.open('./models/planets.ts')
  }
})
