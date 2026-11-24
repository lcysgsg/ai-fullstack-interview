// Checks existing behavior, not the new disable feature.
import assert from 'node:assert/strict'
import { request, success, runChecks } from './check-http.mjs'
import { createDevice, devices, readDevice } from './device-check-fixture.mjs'

await runChecks([
  ['B0 list devices', async () => { await devices() }],
  ['B1 create / edit / read back', async () => {
    const d = await createDevice()
    const updated = success(await request('/api/devices/' + d.id, 'PUT',
      { code: d.code, name: '验收设备已更新' }), 'edit device')
    assert.equal(updated.name, '验收设备已更新')
    assert.equal((await readDevice(d.id)).name, '验收设备已更新')
    assert.equal((await readDevice(d.id)).status, 'NORMAL')
  }],
  ['B2 duplicate code rejected', async () => {
    const d = await createDevice()
    const duplicate = await request('/api/devices', 'POST', { code: d.code, name: '重复' })
    assert.equal(duplicate.status, 400)
    assert.equal(duplicate.payload.code, 'BUSINESS_ERROR')
  }],
  ['B3 invalid name rejected', async () => {
    const d = await createDevice()
    const invalid = await request('/api/devices/' + d.id, 'PUT', { code: d.code, name: '   ' })
    assert.equal(invalid.status, 400)
    assert.equal(invalid.payload.code, 'VALIDATION_ERROR')
    assert.equal((await readDevice(d.id)).name, d.name)
    const create = await request('/api/devices', 'POST', { code: d.code + 'X', name: '   ' })
    assert.equal(create.status, 400)
    assert.equal(create.payload.code, 'VALIDATION_ERROR')
  }]
])
