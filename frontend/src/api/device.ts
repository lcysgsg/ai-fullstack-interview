import axios from 'axios'
import type { Device, DeviceForm } from '../types/device'

const client = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export async function getDevices() {
  const { data } = await client.get<Device[]>('/devices')
  return data
}

export async function createDevice(payload: DeviceForm) {
  const { data } = await client.post<Device>('/devices', payload)
  return data
}

export async function updateDevice(id: number, payload: DeviceForm) {
  const { data } = await client.put<Device>(`/devices/${id}`, payload)
  return data
}
