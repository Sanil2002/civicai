import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axiosInstance from '@/services/axiosInstance/axiosInstance'
import { store } from '@/redux-store/store/store'
import { AxiosError } from 'axios'

vi.mock('@/configs/enviornment', () => ({
  getENVData: vi.fn(() => ({ baseURL: 'https://api.example.com' })),
}))

vi.mock('@/redux-store/store/store', () => ({
  store: {
    getState: vi.fn(),
  },
}))

describe('axiosInstance', () => {
  let mockAxios: MockAdapter

  beforeEach(() => {
    mockAxios = new MockAdapter(axiosInstance)
    vi.clearAllMocks()
  })

  it('should have the correct baseURL', () => {
    expect(axiosInstance.defaults.baseURL).toBe('https://api.example.com')
  })

  it('should attach accessToken to the Authorization header if it exists', async () => {
    ;(store.getState as Mock).mockReturnValue({
      token: { accessToken: 'mockedAccessToken' },
    })
    mockAxios.onGet('/test').reply(200)
    await axiosInstance.get('/test')
    const request = mockAxios.history.get[0]
    expect(request.headers?.Authorization).toBe('Bearer mockedAccessToken')
  })

  it('should not attach Authorization header if accessToken does not exist', async () => {
    ;(store.getState as Mock).mockReturnValue({
      token: { accessToken: null },
    })
    mockAxios.onGet('/test').reply(200)
    await axiosInstance.get('/test')
    const request = mockAxios.history.get[0]
    expect(request.headers?.Authorization).toBeUndefined()
  })

  it('should handle 401 error and reject the promise', async () => {
    mockAxios.onGet('/test').reply(401)
    try {
      await axiosInstance.get('/test')
    } catch (error) {
      const axiosError = error as AxiosError
      expect(axiosError.response?.status).toBe(401)
    }
  })
})
