import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfirmationStateService {

    private jobQueue: Subject<{
        eventId: string,
        event: any
    }>
        = new Subject<{ eventId: string, event: any }>();

    // Observable to emit confirmation results
    private confirmationResultSubject: Subject<{
        eventId: string,
        result: string
    }> = new Subject<{ eventId: string, result: string }>();

    // Convert the confirmation result subject to a stream of observable values
    confirmationResult$: Observable<{
        eventId: string,
        result: string
    }>
        = this.confirmationResultSubject.asObservable();

    constructor() { }

    // Method to add an event to the confirmation job queue
    addToQueue(eventId: string, event: any) {
        this.jobQueue.next({ eventId, event });
    }

    // Method to confirm or reject an event
    confirmEvent(eventId: string, isConfirmed: boolean) {
        const result = isConfirmed ? 'success' : 'failure';
        // Emit confirmation result when available
        this.confirmationResultSubject.next({ eventId, result });
    }

    get jobQueue$(): Observable<{ eventId: string, event: any }> {
        return this.jobQueue.asObservable();
    }
}
