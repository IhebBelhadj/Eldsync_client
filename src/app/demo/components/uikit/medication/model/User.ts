export interface User {
    id: number;
    username: string;
    password: string;
    role: Role;
  }
  
  export enum Role {
    NURSE = 'NURSE',
    DOCTOR = 'DOCTOR',
    ADMIN = 'ADMIN'
  }
  