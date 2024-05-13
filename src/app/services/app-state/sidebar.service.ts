import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    private isOpenSubject = new BehaviorSubject<boolean>(false);
    isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

    constructor() { }

    toggleSidebar() {
        const currentIsOpen = this.isOpenSubject.value;
        this.isOpenSubject.next(!currentIsOpen);
    }

    openSidebar() {
        this.isOpenSubject.next(true);
    }

    closeSidebar() {
        this.isOpenSubject.next(false);
    }
}
