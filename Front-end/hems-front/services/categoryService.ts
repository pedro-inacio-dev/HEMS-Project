import { Category } from "@/types/mainEntities"
import { BaseService } from "./baseService"

const EntityName = "CATEGORY"

class CategoryService extends BaseService {
    constructor() {
        super("category")
    }

    async getAllInfo(): Promise<Category[]> {
        const response = await fetch(`${this.baseUrl}/AllInfo`, 
            {
                method: "GET",
                headers: this.getHeaders()
            }
        )

        return this.handleResponse<Category[]>(response, "GET" , EntityName)
    }

    getCategory() {
        return this.get<Category[]>(EntityName)
    }

    getCategoryById(id : number) {
        return this.get<Category[]>(EntityName, `/${id}`)
    }

    create(newObj: Category) {
        return this.post<Category>(EntityName, newObj)
    }

    update(id: number, nome: string) {
        return this.put<void>(EntityName, { nome }, `/${id}`)
    }

    deletecategory(id: number) {
        return this.delete(EntityName, `/${id}`)
    }
}

export default new CategoryService()