import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../utils/api';

export type Response<T> = {
    data: T[] | null,
    loading: boolean,
    error: string | null,
    refetch: () => Promise<void>
}

export default function useFetchAll<T>(baseUrl: string, filters?: Record<string, string>): Response<T> {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const filterString = filters ? JSON.stringify(filters) : "";

    {/* Construction de l'URL finale */ }
    const buildUrl = useCallback(() => {
        if (!filters || filters === undefined) return baseUrl;

        const params = new URLSearchParams();
        for (const [k, v] of Object.entries(filters)) {
            params.set(k, v);
        }

        return `${baseUrl}?${params.toString()}`;
    }, [baseUrl, filterString])

    const abortControllerRef = useRef<AbortController | null>(null);

    {/* Fonction de récupération des données */ }
    const fetchData = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        setLoading(true);

        try {
            const response = await api.get(
                baseUrl,
                {
                    signal: controller.signal,
                }
            );
            console.log(response)
            console.log(response.data)
            setData(response.data);
            setError(null);
        } catch (error: any) {
            if (controller.signal.aborted || error.code === "ERR_CANCELED") {
                return;
            }
            console.log(error)
            setError('Erreur lors de la récupération des données');
            setData(null);
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, [buildUrl])

    {/* Appel de la fonction de récupération des données dans un useEffect */ }
    useEffect(() => {

        if (filters !== undefined) {
            let filterChain = '?'
            console.log(filters)
            Object.entries(filters).forEach(([key, value]) => {
                filterChain = filterChain.concat(`${key}=${value}&`)
            })
            filterChain = filterChain.slice(0, -1)
            console.log(filterChain)
            baseUrl = baseUrl.concat(filterChain)
            console.log(baseUrl)
        }
        fetchData();
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchData])

    {/* Mise en place d'une référence stable à la fonction pour pouvoir l'utiliser dans les composants sans remontage des composants systématiqueemnt */ }
    const refetch = useCallback(async () => {
        await fetchData();
    }, [fetchData]);


    return { data, loading, error, refetch }
}
