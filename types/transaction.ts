export interface Transaction {
    transaction_id: string,
    account_id: string,
    amount: number,
    created_at: Date
}

export interface Account {
    account_id: string,
    balance: number
}