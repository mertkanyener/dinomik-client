import { AuthResponse } from './auth-response.int';

export interface LoginStatus {
    status: string;
    authResponse: AuthResponse;
}