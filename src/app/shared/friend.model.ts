export class Friend {

    id: number;
    firstName: string;
    lastName: string;
    image: string;
    facebookUser: boolean;

    constructor(id: number, firstName: string, lastName: string, image: string, facebookUser: boolean){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
        this.facebookUser = facebookUser;
    }
}