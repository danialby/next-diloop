import { render, screen, fireEvent, waitFor } from '@/__tests__/testUtils/utils'
import userEvent from '@testing-library/user-event'
import { describe, expect, vi, it, beforeAll } from 'vitest'
import axiosInstance from '@/lib/axiosInstance'
import UserLoginPage from '@/app/(full-width-pages)/(auth)/login/page'


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

describe('UserLoginPage', () => {
  beforeAll(() => {
    render(<UserLoginPage />)
  })

  it('renders the login page with heading', () => {
    // Assuming the login heading is "ورود به دیلوپ"
    const heading = screen.getByRole('heading', {
      level: 1,
      name: /ورود به دیلوپ/i,
    })
    expect(heading).toBeDefined()
  })

  it('renders page elements', () => {
    const mobileInput = screen.getByTestId('mobile-input')
    expect(mobileInput).toBeDefined()
    const loginButton = screen.getByTestId('login-btn')
    expect(loginButton).toBeDefined()
  })

  it('allows user to enter mobile number', async () => {
    const mobileInput = screen.getByTestId('mobile-input')
    await userEvent.type(mobileInput, '09123456789')
    expect(mobileInput.value).toBe('09123456789')
  })

  it('handles form submission when login button is clicked', async () => {
 
    const loginButton = screen.getByTestId('login-btn')
    const mobileInput = screen.getByTestId('mobile-input')

    // If needed, type the mobile number (if not already typed)
    await userEvent.clear(mobileInput)
    await userEvent.type(mobileInput, '09123456789')

       fireEvent.click(loginButton)
    await waitFor(() => {
       expect(axiosInstance.post).toHaveBeenCalledWith(
        '/api/v1/login',
        {
          mobile: '09123456789',
          method:'otp'
        },
        undefined
      )
    })
      await waitFor(() => {
          // Expect router.push to have been called with the OTP verification route.
          expect(mockPush).toHaveBeenCalledWith('/login/input-code')
        })
  })
})
