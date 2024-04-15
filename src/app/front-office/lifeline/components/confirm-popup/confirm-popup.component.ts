import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'lifeline-confirm-popup',
    standalone: true,
    imports: [ConfirmDialogModule],

    providers: [ConfirmationService],
    templateUrl: './confirm-popup.component.html',
    styleUrl: './confirm-popup.component.scss'
})
export class ConfirmPopupComponent {

    constructor(private confirmationService: ConfirmationService) { }

    Confirm() {
        this.confirmationService.confirm({
            message: 'Do you want to close this dialog?',
            accept: () => {
                console.log('Dialog closed');
            }
        });
    }

    Close() {
        this.confirmationService.close();
    }
}
