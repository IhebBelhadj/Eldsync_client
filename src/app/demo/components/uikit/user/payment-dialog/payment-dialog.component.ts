import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceType, Services } from '../model/Services';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-payment-dialog',
    templateUrl: './payment-dialog.component.html',
    styleUrls: ['./payment-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PaymentDialogComponent implements OnInit {

    services: Services[] = [];

    serviceTypes = Object.values(ServiceType);

    selectedServices: { [key: string]: boolean } = {};

    constructor(public dialogRef: MatDialogRef<PaymentDialogComponent>, private userService: UserService, private authService: AuthService) { }

    ngOnInit(): void {
        const name = this.authService.getUserIdFromToken();
        this.loadStripe();
    }

    s: number = 0;
    addServicesToElder(): void {
        // Effectuer le paiement avant d'ajouter les services
        this.pay().then(() => {
            // Récupérer le nom d'utilisateur à partir du token
            const name = this.authService.getUserIdFromToken();
            // Récupérer l'ID de l'utilisateur à partir du nom d'utilisateur
            this.userService.getUserIdFromUsername(name).subscribe(
                (userId: number) => {
                    // Récupérer les services sélectionnés
                    const selectedServices = Object.keys(this.selectedServices)
                        .filter(service => this.selectedServices[service]);

                    // Ajouter les services sélectionnés à l'utilisateur
                    selectedServices.forEach(service => {
                        this.userService.addServicesToElder(userId, service).subscribe(
                            response => {
                                // Traitez la réponse de la requête si nécessaire
                                console.log('Services ajoutés avec succès:', response);
                            },
                            error => {
                                // Gérer les erreurs de la requête si nécessaire
                                console.error('Erreur lors de l\'ajout des services:', error);
                            }
                        );
                    });
                    // Une fois les services ajoutés, afficher un message de confirmation à l'utilisateur
                    Swal.fire('Success!', "Your paiment is done successfully", 'success');
                    // Fermer la boîte de dialogue
                    this.dialogRef.close();
                },
                error => {
                    // Gérer les erreurs si la récupération de l'ID de l'utilisateur échoue
                    console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur:', error);
                    // Fermer la boîte de dialogue en cas d'erreur
                    this.dialogRef.close();
                }
            );
        }).catch(error => {
            // Gérer les erreurs de paiement si nécessaire
            console.error('Erreur lors du paiement:', error);
            // Fermer la boîte de dialogue en cas d'erreur
            this.dialogRef.close();
        });
    }
    handler: any = null;
    payEnabled: boolean = false;
    pay(): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            var handler = (<any>window).StripeCheckout.configure({
                key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
                locale: 'auto',
                token: (token: any) => {  // Utilisez une fonction fléchée ici aussi
                    console.log(token)
                    alert('Payment Success!!');
                    this.payEnabled = true; // Assurez-vous que this fait référence à l'instance correcte de la classe
                    resolve(); // Résoudre la promesse lorsque le paiement est effectué avec succès
                }
            });

            handler.open({
                name: 'ELDSYNC',
                description: 'Paiment', // Mettez la description de votre commande ici
                // Convertir le montant en centimes si nécessaire
            });
        });
    }

    loadStripe() {

        if (!window.document.getElementById('stripe-script')) {
            var s = window.document.createElement("script");
            s.id = "stripe-script";
            s.type = "text/javascript";
            s.src = "https://checkout.stripe.com/checkout.js";
            s.onload = () => {
                this.handler = (<any>window).StripeCheckout.configure({
                    key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
                    locale: 'auto',

                    token: (token: any) => {  // Utilisez une fonction fléchée ici aussi
                        console.log(token)
                        alert('Payment Success!!');
                        this.payEnabled = true; // Assurez-vous que this fait référence à l'instance correcte de la classe
                    }
                });
            }

            window.document.body.appendChild(s);
        }
    }

}
