import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../uikit/user/service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    styleUrls:['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginFormGroup!: FormGroup;
    username: string = '';
    password: string = '';
    rememberMe: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackbar: MatSnackBar,
    ) {}
  
    ngOnInit(): void {
        this.loginFormGroup = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    handleLogin() {
        if (this.loginFormGroup.invalid) {
            this.snackbar.open('Please fill all fields correctly.', 'close', {
                duration: 5000,
            });
            return;
        }
    
        this.authService.login(this.loginFormGroup.value).subscribe(
            (response) => {
                this.snackbar.open('Login successful.', 'close', { duration: 5000 });
                console.log(response.roles);
                const userRoles = response.roles || [];
                if (userRoles.includes('ELDER')) {
                    this.router.navigate(['/uikit/user/profile']);
                } else if (userRoles.includes('DOCTOR')) {
                    this.router.navigate(['/uikit/user/doctor']);
                } else if (userRoles.includes('NURSE')) {
                    this.router.navigate(['/uikit/user/nurse']);
                } else if (userRoles.includes('ADMIN')) {
                    this.router.navigate(['/uikit/user/list']);
                } else {
                    this.snackbar.open('Unauthorized Access', 'close', {
                        duration: 5000,
                    });
                }
            },
            (error) => {
                console.error('Login error:', error);
                this.snackbar.open(
                    'Failed to log in. Please check your credentials.',
                    'close',
                    { duration: 5000 }
                );
            }
        );
    }
}
