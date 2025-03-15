//// filepath: /home/reza/work/Projects/Diloop/DiloopFrontEndReactNext/src/__tests__/testUtils/createMockRouter.ts
import { NextRouter } from 'next/router'
import { vi } from 'vitest'

export function createMockRouter(router: Partial<NextRouter> = {}): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    ...router,
  }
}
