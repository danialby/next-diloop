import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

function useAuthQuery<T>(queryKey: string[], endpoint: string, options?: UseQueryOptions<T>): UseQueryResult<T> {
  const { get } = useAxios()

  return useQuery<T>({
    queryKey,
    queryFn: () => get<T>(endpoint),
    ...options,
  })
}

export default useAuthQuery
