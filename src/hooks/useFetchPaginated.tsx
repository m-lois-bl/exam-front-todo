import { type AxiosResponse } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ApiResponse } from '../types/response.interface';
import api from '../utils/api';

export type Response<T> = {
    data: T[] | null,
    nextPage: number | null,
    previousPage: number | null,
    totalElements: number,
    loading: boolean,
    error: string | null,
    refetch: () => Promise<void>
}

export default function useFetchPaginated<T>(baseUrl: string, filters?: Record<string, string>): Response<T> {
    const [data, setData] = useState<T[] | null>(null);
    const [nextPage, setNexttPage] = useState<number | null>(null)
    const [previousPage, setPreviousPage] = useState<number | null>(null)
    const [totalElements, setTotalElements] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const filterString = filters ? JSON.stringify(filters) : "";

    {/* Construction de l'URL finale */}
    const buildUrl = useCallback(() => {
        if (!filters || filters === undefined) return baseUrl;

        const params = new URLSearchParams();
        for (const [k, v] of Object.entries(filters)) {
            params.set(k, v);
        }

        return `${baseUrl}?${params.toString()}`;
    }, [baseUrl, filterString]);

    const abortControllerRef = useRef<AbortController | null>(null);

    {/* Fonction de récupération des données */}
    const fetchData = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        const finalUrl = buildUrl()
        setLoading(true);

        try {
            const response: AxiosResponse<ApiResponse<T>> = await api.get(
                finalUrl,
                {
                    signal: controller.signal,
                }
            );
            console.log(response)
            console.log(response.data.results)
            setData(response.data.results);
            setNexttPage(response.data.nextPage);
            setPreviousPage(response.data.previousPage);
            setTotalElements(response.data.count);
            setError(null);
        } catch (error: any) {
            if (controller.signal.aborted || error.code === "ERR_CANCELED") {
                return;
            }
            console.log(error)
            setError('Erreur lors de la récupération des données');
            setData(null);
            setNexttPage(null);
            setPreviousPage(null);
            setTotalElements(0);
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, [buildUrl])

    {/* Appel de la fonction de récupération des données dans un useEffect */}
    useEffect(() => {
        fetchData();
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchData])

    {/* Mise en place d'une référence stable à la fonction pour pouvoir l'utiliser dans les composants sans remontage des composants systématiqueemnt */}
    const refetch = useCallback(async () => {
        await fetchData();
    }, [fetchData]);


    return { data, previousPage, nextPage, totalElements, loading, error, refetch }
}
