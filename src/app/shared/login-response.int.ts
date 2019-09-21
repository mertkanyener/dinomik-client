import { AuthResponse } from './auth-response.int';

export interface LoginResponse {
    authResponse: AuthResponse;
    status: string;
}