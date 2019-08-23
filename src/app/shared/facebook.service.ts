import { Injectable } from "@angular/core";

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

    init(): Promise<any> {
        try {
            return Promise.resolve(FB.init());
        } catch (e) {
            return Promise.reject(e);
        }
    }

    

}