import type { RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React from 'react'

const queryClient = new QueryClient()

interface AllTheProvidersProps {
  children: ReactNode
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// re-export everything from react testing library
export * from '@testing-library/react'

// override render method
export { customRender as render }
