export interface userSessionInterface {
    login: boolean;
    token: string;
    user: {
        name: string;
        email: string;
        address: string;
        phone: string;
        orders: [];
        id: number;
    };
}