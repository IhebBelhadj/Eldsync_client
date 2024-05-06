import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationStateService } from '../../state/confirmation-state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
    selector: 'lifeline-confirm-popup',
    standalone: true,
    imports: [ConfirmDialogModule],

    providers: [ConfirmationService],
    templateUrl: './confirm-popup.component.html',
    styleUrl: './confirm-popup.component.scss'
})
export class ConfirmPopupComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();
    event: any;
    eventId: string;

    constructor(
        private confirmationService: ConfirmationService,
        private confirmationStateService: ConfirmationStateService
    ) {
        // Subscribe to the confirmation job queue
        this.confirmationStateService.jobQueue$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(confirmationEvent => {
                console.log('confirmation event : ', confirmationEvent);
                this.event = confirmationEvent.event;
                this.eventId = confirmationEvent.eventId;
                this.showConfirmationPopup();
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    showConfirmationPopup() {
        this.confirmationService.confirm({
            message: this.event.message, // Assuming event has a 'message' property
            accept: () => {
                this.confirmationStateService.confirmEvent(this.eventId, true); // Confirm event
            },
            reject: () => {
                this.confirmationStateService.confirmEvent(this.eventId, false); // Reject event
            }
        });
    }
}
