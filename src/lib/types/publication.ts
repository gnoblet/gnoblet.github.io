export interface Publication {
    id: number;
    authors: string;
    year: number;
    title: string;
    journal: string;
    volume?: string;
    issue?: string;
    pages?: string;
    doi?: string;
    url?: string;
}
