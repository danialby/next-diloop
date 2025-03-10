import {QueryFunction, useQuery, UseQueryOptions, UseQueryResult} from '@tanstack/react-query';

const usePublicQuery = <T>(
    queryKey: string[], // Unique key for the query// API endpoint to fetch data from
    queryFn: QueryFunction<T>, // Unique key for the query
    options?: UseQueryOptions<T> | null,  // Additional React Query options
    enabled: boolean = true,
    retry: boolean = false,
    throwOnError: boolean = true,
): UseQueryResult<T> => {
    return useQuery<T>({
        queryKey, // Unique key for caching
        queryFn,
        enabled,
        retry,
        ...options, // Spread additional options (e.g., staleTime, retry)
        throwOnError
    });
};

export default usePublicQuery;
