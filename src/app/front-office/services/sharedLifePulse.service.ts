import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedLifePulseService {
    private containerVisibleSubject = new BehaviorSubject<boolean>(true);
    containerVisible$ = this.containerVisibleSubject.asObservable();
    private modifyCssSubject = new BehaviorSubject<boolean>(false);
    modifyCss$ = this.modifyCssSubject.asObservable();
    private modifyCssSubjectImage = new BehaviorSubject<boolean>(false);
    modifyCssImage$ = this.modifyCssSubjectImage.asObservable();

    toggleContainerVisibility() {
        this.containerVisibleSubject.next(!this.containerVisibleSubject.value);
    }
    toggleModifyCss() {
        this.modifyCssSubject.next(!this.modifyCssSubject.value);
    }
    /*normal state*/
    toggleModifyCssFalse() {
        this.modifyCssSubject.next(false);
    }
    toggleContainerVisibilityTrue() {
        this.containerVisibleSubject.next(true);
    }

    /*reverse state*/
    toggleModifyCssTrue() {
        this.modifyCssSubject.next(true);
    }
    toggleContainerVisibilityFalse() {
        this.containerVisibleSubject.next(false);
    }
    toggelModifyCssImage() {
        this.modifyCssSubjectImage.next(!this.modifyCssSubjectImage.value);
    }
    /*measurements bar visibility */

}
