import { AuthResponse } from './auth-response.int';
import { Injectable } from '@angular/core';
import { LoginStatus } from './login-status.int';
import { LoginOptions } from './login-options.int';
import { LoginResponse } from './login-response.int';

declare var FB: any;


export interface InitParams {
    appId?: string;
    version?: string;
    cookie?: boolean;
    status?: boolean;
    xfbml?: boolean;
    frictionlessRequests?: boolean;
    hideFlashCallBack?: any;
    autoLogAppEvents?: boolean;
}

@Injectable()
export class FacebookService {

    init(params: InitParams): Promise<any> {
        try {
            return Promise.resolve(FB.init(params));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    api(path: string, method: string, params: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                FB.api(path, method, params, (response: any) => {
                    if (!response) {
                        reject();
                    } else if (response.error) {
                        reject(response.error);
                    } else {
                        resolve(response);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }


    getLoginStatus(forceFreshResponse?: boolean): Promise<LoginStatus> {
        return new Promise<LoginStatus>((resolve, reject) => {
            try {
                FB.getLoginStatus((response: LoginStatus) =>{
                    if (!response) {
                        reject();
                    } else {
                        resolve(response);
                    }
                }, forceFreshResponse);
            } catch (e) {
                reject(e);
            }
        });
    }

    login(options?: LoginOptions): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            try {
                FB.login((response: LoginResponse) => {
                    if (response.authResponse) {
                        resolve(response);
                    } else {
                        reject();
                    }
                }, options);
            } catch (e) {
                reject(e);
            }
        });
    }

    logout(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                FB.logout((response: any) => {
                    resolve(response);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    getAuthResponse(): AuthResponse {
        try {
            return <AuthResponse>FB.getAuthResponse();
        } catch (e) {
            console.error('FacebookService Error: ', e);
        }
    }

}