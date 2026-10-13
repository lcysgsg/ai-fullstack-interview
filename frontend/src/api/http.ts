import axios from 'axios'

export interface ApiErrorPayload {
  code?: string
  message?: string
  timestamp?: string
}

export const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export function getApiErrorMessage(error: unknown, fallback = '操作失败，请稍后重试') {
  if (axios.isAxiosError<ApiErrorPayload>(error)) {
    return error.response?.data?.message || error.message || fallback
  }
  if (error instanceof Error) {
    return error.message
  }
  return fallback
}
