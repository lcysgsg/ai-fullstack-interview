import assert from 'node:assert/strict'
import { request, success, unique } from './check-http.mjs'

export async function createDevice() {
  const code = 'DEV-CHECK-' + unique()
  const device = success(await request('/api/devices', 'POST', { code, name: '验收模拟设备' }), 'create device')
  assert.equal(device.code, code)
  assert.equal(device.status, 'NORMAL')
  assert.ok(device.id != null, 'device id missing')
  return device
}

export async function devices() {
  const list = success(await request('/api/devices'), 'list devices')
  assert.ok(Array.isArray(list), 'device list must be an array')
  return list
}

export async function readDevice(id) {
  const device = (await devices()).find(d => d.id === id)
  assert.ok(device, 'device not found in list: ' + id)
  return device
}
