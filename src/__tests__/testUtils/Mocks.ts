 
import { vi } from 'vitest'

// ----- Axios Instance Mock -----

// This variable holds the current response data for the post call.
export let postResponseData = { data: { data: { result: true  } } }

// Setter to update the post response data from individual tests.
export const setPostResponseData = (response: never) => {
  postResponseData = {data:response}
}

export const axiosMock = {
  interceptors: {
    request: { use: vi.fn() },
    response: { use: vi.fn() },
  },
  get: vi.fn(),
  post: vi.fn(( ) => {
    return Promise.resolve(postResponseData)
  }),
}

vi.mock('@/lib/axiosInstance', () => {
  return {
    __esModule: true,
    default: axiosMock,
  }
})

// ----- Next/navigation Mock -----
export const mockNavigationPush = vi.fn()

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: mockNavigationPush,
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({})),
    usePathname: vi.fn(),
  }
})
