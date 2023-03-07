export type Asset = {
    id: string;
    name: string;
    description?: string;
    image?: string;
    external_url?: string;
    mediaType: string;
    tags: string[];
}

export default Asset;