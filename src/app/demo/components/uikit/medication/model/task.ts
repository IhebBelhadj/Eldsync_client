import { StatusTask } from "./StatusTask";
import { Elder } from "./Elder";

export class Task {
    id: number;
    title: string;
    description: string;
    date: Date;
    status: StatusTask;
    elder: Elder;
  }
  
  export interface User {
    id: number;
    name: string;
    role: Role;
  }
  export enum Role {
    NURSE = 'NURSE',
    DOCTOR = 'DOCTOR',
    ADMIN = 'ADMIN'
  }
  
  