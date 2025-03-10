import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import useAxios from './useAxios';

const useAuthQuery = <T>(
    queryKey: string[],
    endpoint: string,
    options?: UseQueryOptions<T>
): UseQueryResult<T> => {
    const { get } = useAxios();

    return useQuery<T>({
        queryKey,
        queryFn: () => get<T>(endpoint),
        ...options,
    });
};

export default useAuthQuery;
