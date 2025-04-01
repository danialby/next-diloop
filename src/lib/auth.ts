import axiosInstance from './axiosInstance'

interface Credentials {
  email: string
  password: string
}

interface AuthResponse {
  accessToken: string
  refreshToken: string
}

// Login function
export async function login(credentials: Credentials): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.post<AuthResponse>('/login', credentials)
    const { accessToken, refreshToken } = response.data

    // Store tokens in localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }

    return response.data
  }
  catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

// Logout function
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = '/login' // Redirect to login page
  }
}
