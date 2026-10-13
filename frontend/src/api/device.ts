import { http } from './http'
import type { Device, DeviceForm } from '../types/device'

export async function getDevices() {
  const { data } = await http.get<Device[]>('/devices')
  return data
}

export async function createDevice(payload: DeviceForm) {
  const { data } = await http.post<Device>('/devices', payload)
  return data
}

export async function updateDevice(id: number, payload: DeviceForm) {
  const { data } = await http.put<Device>(`/devices/${id}`, payload)
  return data
}
