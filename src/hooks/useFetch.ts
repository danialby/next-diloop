import { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';

const useFetchData = <T>(endpoint: string) => {
    const { get } = useAxios(); // Initialize useAxios at the top level
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data using useAxios in an async function
    const fetchData = async () => {
        try {
            const response = await get<T>(endpoint); // Use the get method
            setData(response);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    // Call the async function in useEffect
    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return { data, isLoading, error };
};

export default useFetchData;
