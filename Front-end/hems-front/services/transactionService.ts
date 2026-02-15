import { Transaction } from "@/types/mainEntities"
import { BaseService } from "./baseService"

const EntityName = "TRANSACTION"

class TransactionService extends BaseService {
    constructor() {
        super("Transaction")
    }

    getTransaction() {
        return this.get<Transaction[]>(EntityName)
    }

    getTransactionById(id : number) {
        return this.get<Transaction[]>(EntityName, `/${id}`)
    }

    create(newObj: Transaction) {
        return this.post<Transaction>(EntityName, newObj)
    }

    update(id: number, nome: string) {
        return this.put<void>(EntityName, { nome }, `/${id}`)
    }

    deleteTransaction(id: number) {
        return this.delete(EntityName, `/${id}`)
    }
}

export default new TransactionService()