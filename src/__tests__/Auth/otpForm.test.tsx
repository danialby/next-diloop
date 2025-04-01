import { axiosMock, mockNavigationPush, setPostResponseData } from '@/__tests__/testUtils/Mocks'
import { render, screen, waitFor } from '@/__tests__/testUtils/utils'
import OtpForm from '@/app/(full-width-pages)/(auth)/login/input-code/page'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

describe('otpForm', () => {
  beforeAll(() => {
    render(<OtpForm />)
  })

  it('renders the OTP input form', () => {
    const formText = screen.getByText('کد دریافت شده را در قسمت پایین وارد کنید')
    expect(formText).toBeDefined()
    const otpInput = screen.getByTestId('otp-input')
    expect(otpInput).toBeDefined()
  })

  it('allows user to set OTP and validate code', async () => {
    setPostResponseData({ data: { result: false, token: 'token' } })
    const otpInput = screen.getByTestId('otp-input')
    await userEvent.type(otpInput, '123456')
    expect(otpInput.value).toBe('123456')
    await waitFor(() => {
      expect(axiosMock.post).toHaveBeenCalledWith(
        '/api/v1/verify-otp',
        {
          mobile: '',
          otp: '123456',
          page: 'login',
        },
        undefined,
      )
    })

    await waitFor(() => {
      // Expect router.push to have been called with the OTP verification route.
      expect(mockNavigationPush).toHaveBeenCalledWith('/admin-panel')
    })
    await waitFor(() => {
      expect(document.cookie).toContain('auth_token=token')
    })
  })
})
