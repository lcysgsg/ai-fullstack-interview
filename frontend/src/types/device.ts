export interface Device {
  id: number
  code: string
  name: string
  status: 'NORMAL' | string
  createdAt: string
}

export interface DeviceForm {
  code: string
  name: string
}
