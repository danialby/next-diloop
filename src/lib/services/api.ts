export class ApiService {
    private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async post<T>(endpoint: string, data: unknown): Promise<{ response: Response }> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'content/json' },
            body: JSON.stringify(data),
        });
        return await response.json();
    }
}
