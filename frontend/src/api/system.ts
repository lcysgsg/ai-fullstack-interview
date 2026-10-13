import { http } from './http'

export interface HealthResponse {
  status: string
  service: string
  storage: string
}

export async function getHealth() {
  const { data } = await http.get<HealthResponse>('/health')
  return data
}
