// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userData: any; // You can define a specific type for user data

    constructor() { }
}
