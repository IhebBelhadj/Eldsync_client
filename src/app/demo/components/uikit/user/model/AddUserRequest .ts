export class AddUserRequest {
    username: string;
    email: string;
    password: string;
 roles: string[]; // Utilisez string[] au lieu de Set<string>
    firstName: string;
    lasteName: string;
    cin: string;
    phone: string;
    gender: Gender; // You can use a more specific type if needed


    
  }
  export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}


  export class AddUserRequestImpl implements AddUserRequest {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public roles: string[], // Utilisez string[] au lieu de Set<string>
        public firstName: string,
        public lasteName: string,
        public cin: string,
        public phone: string,
        public gender: Gender
    ) {}
}