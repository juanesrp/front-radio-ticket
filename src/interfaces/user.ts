export interface User {
    id: string
    name: string
    lastName: string
    phone: string
    email: string
    isAdmin: boolean
    isSuperAdmin: boolean
    isEmailConfirmed: boolean
}

export interface ApiResponse {
    data: User | null
    status?: number;
    error?: string;
}
