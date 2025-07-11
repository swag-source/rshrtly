export function isValidUrl(link: string): boolean {
    try {
        const url = new URL(link);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}