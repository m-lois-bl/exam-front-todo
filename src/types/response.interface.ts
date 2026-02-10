export interface ApiResponse<T> {
    count: number;
    currentPage: number| null;
    totalPages: number | null;
    nextPage: number | null;
    previousPage: number | null;
    results: T[]
}