import { render, screen, fireEvent, waitFor } from '@/__tests__/testUtils/utils'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, beforeAll } from 'vitest'
import { axiosMock, mockNavigationPush, setPostResponseData } from '@/__tests__/testUtils/Mocks'
import UserLoginPage from '@/app/(full-width-pages)/(auth)/login/page'

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
    setPostResponseData({ data: { result: true } })
    const loginButton = screen.getByTestId('login-btn')
    const mobileInput = screen.getByTestId('mobile-input')

    // If needed, type the mobile number (if not already typed)
    await userEvent.clear(mobileInput)
    await userEvent.type(mobileInput, '09123456789')

    fireEvent.click(loginButton)
    await waitFor(() => {
      expect(axiosMock.post).toHaveBeenCalledWith(
        '/api/v1/login',
        {
          mobile: '09123456789',
          method: 'otp'
        },
        undefined
      )
    })
    await waitFor(() => {
      // Expect router.push to have been called with the OTP verification route.
      expect(mockNavigationPush).toHaveBeenCalledWith('/login/input-code')
    })
  })
})
