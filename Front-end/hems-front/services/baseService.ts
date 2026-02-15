export abstract class BaseService {
    protected baseUrl: string

    constructor(endpoint: string) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL

        if (!apiUrl) {
            throw new Error("API_URL não encontrada")
        }

        this.baseUrl = `${apiUrl}/${endpoint}`
    }

    protected async get<T>(entityName: string, path: string = ""): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: "GET",
            headers: this.getHeaders()
        })

        return this.handleResponse<T>(response, "GET" , entityName)
    }

    protected async post<T>(entityName: string, body: any, path: string = ""): Promise<T> {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(body)
        })

        return this.handleResponse<T>(response, "POST" , entityName)
    }

    protected async put<T>(entityName: string, body: any, path: string = ""): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(body)
        })

        return this.handleResponse<T>(response, "PUT" , entityName)
    }

    protected async delete(entityName: string, path: string = ""): Promise<void> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: "DELETE",
            headers: this.getHeaders()
        })

        this.errorCheck(response, "DELETE", entityName)
    }

    protected getHeaders() {
        return {
            "Content-Type": "application/json"
        }
    }

    protected async handleResponse<T>(response: Response, method: string, entityName: string): Promise<T> {
        this.errorCheck(response, method, entityName)
        return response.json()
    }

    protected async errorCheck(response: Response, method: string, entityName: string){
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || `Erro na requisição ${method} de ${entityName}`)
        }
    }
}