import { Category, TotalByCategory } from "@/types/mainEntities"
import { BaseService } from "./baseService"

const EntityName = "CATEGORY"

class CategoryService extends BaseService {
    constructor() {
        super("category")
    }

    async getAllInfo(): Promise<TotalByCategory> {
        const response = await fetch(`${this.baseUrl}/TotalByCategory`, 
            {
                method: "GET",
                headers: this.getHeaders()
            }
        )

        return this.handleResponse<TotalByCategory>(response, "GET" , EntityName)
    }

    getCategory() {
        return this.get<Category[]>(EntityName)
    }

    getCategoryById(id : number) {
        return this.get<Category>(EntityName, `/${id}`)
    }

    create(newObj: Category) {
        return this.post<Category>(EntityName, newObj)
    }

    update(id: number, category: Category) {
        return this.put<void>(EntityName, category, `/${id}`)
    }

    deletecategory(id: number) {
        return this.delete(EntityName, `/${id}`)
    }
}

export default new CategoryService()