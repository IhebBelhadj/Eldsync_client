import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { ChangePasswordRequest } from '../model/ChangePasswordRequest';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';



@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.scss'],
    encapsulation: ViewEncapsulation.None,
})



export class ProfilComponent implements OnInit {
    //user!: User ;
    user: any = {};
    isEditMode: boolean = false;
    changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest(); // Initialize the ChangePasswordRequest
    id: string;
    showChangePasswordArea = false;
    imageFile: File | undefined;
    imageUrl: string | undefined;
    @ViewChild('fileInput') fileInput: any;


    constructor(private authService: AuthService, private dialog: MatDialog, private router: Router, private userService: UserService,
        private route: ActivatedRoute) { }



    ngOnInit(): void {
        const userId = this.authService.getUserIdFromToken();
        if (userId) {
            this.loadUser(userId);
            console.log(userId);

        } else {
            console.error('User ID not found in token or token is missing.');
            // Handle the case when user ID is not available
        }
    }

    toggleChangePasswordArea() {
        this.showChangePasswordArea = !this.showChangePasswordArea;
    }
    logout() {
        this.authService.logout();
        // Appelle la méthode de déconnexion
        this.router.navigate(['/uikit/user/login']);
    }

    loadUser(username: string): void {
        // Call your userService method to get the user ID from the username
        this.userService.getUserIdFromUsername(username).subscribe(
            (userId: number) => {
                if (userId) {
                    // If user ID is retrieved, load the user using the user ID
                    this.userService.getUserById(userId).subscribe(
                        (user: User) => {
                            this.user = user;
                            this.isEditMode = true; // Set edit mode to true when user data is loaded
                            console.log(user);
                            console.log(user.id);


                        },
                        (error) => {
                            console.error('Error fetching user data:', error);
                        }
                    );
                } else {
                    console.error('User ID not found for username:', username);
                    // Handle the case when user ID is not available
                }
            },
            (error) => {
                console.error('Error fetching user ID:', error);
            }
        );
    }
    updateProfile() {
        this.userService.updateUser(this.user).subscribe(data => {
            // Optionally, you can perform any other actions here
            console.log('User updated successfully!');
        });
    }


    changePassword(): void {
        // Check if the new password matches the retype password
        /* if (this.changePasswordRequest.newPassword !== this.changePasswordRequest.retypePassword) {
           console.error('New password and retype password do not match');
           return;
         }*/

        // Set the user ID in the changePasswordRequest object
        this.changePasswordRequest.userId = this.user.id;

        // Call the userService method to change the password
        this.userService.changePassword(this.changePasswordRequest)
            .subscribe(
                (response: any) => {
                    console.log('Password change response:', response);
                    // Check if the response contains the success message
                    if (response && response.includes('Password changed successfully')) {
                        console.log('Password changed successfully');
                        // Optionally, you can reset the form fields here
                        this.id = this.user
                        this.changePasswordRequest.currentPassword = '';
                        this.changePasswordRequest.newPassword = '';
                    } else {
                        console.log(this.changePasswordRequest);

                        console.error('Unexpected response:', response);
                    }
                },
                (error) => {

                    console.error('Error changing password:', error);
                }
            );
    }

    openPaymentPopup() {
        // Ouvrir la boîte de dialogue de paiement
        const dialogRef = this.dialog.open(PaymentDialogComponent, {
            width: '500px', // spécifiez la largeur de la boîte de dialogue
            data: {} // vous pouvez passer des données à la boîte de dialogue si nécessaire
        });

        // Gérer les actions après la fermeture de la boîte de dialogue
        dialogRef.afterClosed().subscribe(result => {
            console.log('La boîte de dialogue de paiement est fermée.', result);
            // Traitez ici la réponse de la boîte de dialogue si nécessaire
        });
    }


    // Function to handle file selection
    onFileSelected(event: any): void {
        this.imageFile = event.target.files[0];
        if (this.imageFile) {
            // Read the selected image file and update the preview
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(this.imageFile);
        }
    }

    // Function to trigger file input click
    triggerFileInputClick(): void {
        this.fileInput.nativeElement.click();
    }

    // Function to handle upload of selected image
    handleUpload(): void {
        if (this.imageFile) {
            // Call uploadImage method to upload the image
            this.userService
                .uploadImage(this.imageFile, this.user.username)
                .subscribe(
                    (response) => {
                        console.log('Image uploaded successfully:', response);
                        // Update user image URL if needed
                        // this.user.imgUrl = response.imageUrl;
                    },
                    (error) => {
                        console.error('Error uploading image:', error);
                    }
                );
        } else {
            console.error('No image selected.');
        }
    }





}
