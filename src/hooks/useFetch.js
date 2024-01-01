import { useState, useEffect, useRef } from "react";
import useToast from '../hooks/useToast';

export const useFetch = (url) => {
    const effectRan = useRef(false)
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const handleShowToast = useToast()
    useEffect(() => {
        if (effectRan.current === false) {
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    const result = await response.json();
                    setData(result);
                    handleShowToast({ message: "Successfully Fetched", type: "success", id: Date.now() })
                    setError(null);
                } catch (err) {
                    setError('Could not fetch the data');
                    handleShowToast({ message: "Could not fetch the data", type: "failure", id: Date.now() })
                } finally {
                    setIsPending(false);
                }
            };

            fetchData();

            return () => {
                effectRan.current = true
            }
        }
    }, [url]);

    return { data, isPending, error };
};
