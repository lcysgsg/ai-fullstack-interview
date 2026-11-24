// Public acceptance for the disable feature; no implementation is prescribed.
import assert from 'node:assert/strict'
import { request, success, rejected, runChecks } from './check-http.mjs'
import { createDevice, readDevice } from './device-check-fixture.mjs'

const path = process.env.DISABLE_PATH || '/api/devices/{id}/disable'
const method = (process.env.DISABLE_METHOD || 'PATCH').toUpperCase()
const inputKey = process.env.DISABLE_INPUT_KEY || 'reason'
const reasonKey = process.env.DISABLED_REASON_KEY || 'disabledReason'
const timeKey = process.env.DISABLED_TIME_KEY || 'disabledAt'
assert.ok(path.startsWith('/') && path.includes('{id}'), 'DISABLE_PATH must include {id}')
const disable = (id, reason) => request(path.replace('{id}', String(id)), method, { [inputKey]: reason })

async function verifyStored(id, reason) {
  const record = await readDevice(id)
  assert.equal(record.status, 'DISABLED')
  assert.equal(record[reasonKey], reason)
  assert.ok(typeof record[timeKey] === 'string' && record[timeKey].trim(), 'disable time missing')
  return record
}

await runChecks([
  ['T1 normal disable / read back', async () => {
    const d = await createDevice()
    const reason = '设备退役'
    success(await disable(d.id, reason), 'disable', null)
    await verifyStored(d.id, reason)
  }],
  ['T2 empty and whitespace reason rejected', async () => {
    const d = await createDevice()
    for (const reason of ['', '   ']) {
      rejected(await disable(d.id, reason), 'empty reason')
      assert.equal((await readDevice(d.id)).status, 'NORMAL')
    }
  }],
  ['T3 201 characters rejected / 200 accepted', async () => {
    const d = await createDevice()
    rejected(await disable(d.id, 'x'.repeat(201)), 'too long reason')
    assert.equal((await readDevice(d.id)).status, 'NORMAL')
    const reason = 'x'.repeat(200)
    success(await disable(d.id, reason), '200-character reason', null)
    await verifyStored(d.id, reason)
  }],
  ['T4 repeat rejected / first metadata preserved', async () => {
    const d = await createDevice()
    success(await disable(d.id, '首次原因'), 'first disable', null)
    const first = await verifyStored(d.id, '首次原因')
    rejected(await disable(d.id, '第二次原因'), 'repeat disable')
    const after = await verifyStored(d.id, '首次原因')
    assert.equal(after[timeKey], first[timeKey], 'first disable time changed')
  }]
])
