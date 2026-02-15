import { Person, TotalByPerson } from "@/types/mainEntities"
import { BaseService } from "./baseService"

const EntityName = "PERSON"

class PersonService extends BaseService {
    constructor() {
        super("person")
    }

    async getAllInfo(): Promise<TotalByPerson> {
        const response = await fetch(`${this.baseUrl}/TotalByPerson`, 
            {
                method: "GET",
                headers: this.getHeaders()
            }
        )
    
        return this.handleResponse<TotalByPerson>(response, "GET" , EntityName)
    }

    getPerson() {
        return this.get<Person[]>(EntityName)
    }

    getPersonById(id : number) {
        return this.get<Person>(EntityName, `/${id}`)
    }

    create(newObj: Person) {
        return this.post<Person>(EntityName, newObj)
    }

    update(id: number, person: Person) {
        return this.put<void>(EntityName, person, `/${id}`)
    }

    deletePerson(id: number) {
        return this.delete(EntityName, `/${id}`)
    }
}

export default new PersonService()