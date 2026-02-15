import { Person } from "@/types/mainEntities"
import { BaseService } from "./baseService"

const EntityName = "PERSON"

class PersonService extends BaseService {
    constructor() {
        super("person")
    }

    async getAllInfo(): Promise<Person[]> {
        const response = await fetch(`${this.baseUrl}/AllInfo`, 
            {
                method: "GET",
                headers: this.getHeaders()
            }
        )

        return this.handleResponse<Person[]>(response, "GET" , EntityName)
    }

    getPerson() {
        return  [{
            id: 1,
            name: "teste",
            age: 20
        },
    {
            id: 2,
            name: "teste2",
            age: 22
        }] //this.get<Person[]>(EntityName)
    }

    getPersonById(id : number) {
        return this.get<Person[]>(EntityName, `/${id}`)
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