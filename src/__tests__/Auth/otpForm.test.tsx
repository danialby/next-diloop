import { render, screen } from '@/__tests__/testUtils/utils'
import { describe, expect, vi, it, beforeAll } from 'vitest'
 
// Mock all SVG imports
 
import OtpForm from '@/app/(full-width-pages)/(auth)/login/input-code/page'

// The following mock ensures that the axios instance shape is correct.
vi.mock('@/lib/axiosInstance', () => {
  return {
    __esModule: true,
    default: {
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
      get: vi.fn(),
      post: vi.fn(() => ({ data: { result: true } })),
    },
  }
})

const mockPush = vi.fn()
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: mockPush,
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({})),
    usePathname: vi.fn(),
  }
})

describe('OtpForm', () => {
  beforeAll(() => {
    render(<OtpForm />)
  })

  it('renders the OTP input form', () => {
    const otpInput = screen.getByPlaceholderText('کد تایید را وارد کنید')
    expect(otpInput).toBeDefined()
  })

  // it('allows user to enter OTP code', async () => {
  //   const otpInput = screen.getByPlaceholderText('کد تایید را وارد کنید')
  //   await userEvent.type(otpInput, '123456')
  //   expect(otpInput.value).toBe('123456')
  // })
})

