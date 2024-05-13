import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User, Gender, Role, Status } from '../model/user';
import { AddUserRequest } from '../model/AddUserRequest ';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddUserComponent {
    Gender = Gender;

    Status = Status;

    newUser: AddUserRequest = {
        username: '',
        email: '',
        password: '',
        roles: [],
        firstName: '',
        lasteName: '',
        cin: '',
        phone: '',
        gender: Gender.MALE // Or any other default value
    } as AddUserRequest;


    constructor(private userService: UserService, private router: Router) { }

    addUser() {
        console.log(this.newUser);

        const rolesArray = Array.from(this.newUser.roles);
        this.newUser.roles = rolesArray;

        // Concatenate roles into a single string
        const rolesString = rolesArray.join('');
        console.log(rolesString);

        // Update the newUser roles property with the concatenated string
        this.newUser.roles = [rolesString]; // Wrap the string in an array

        // Now this.newUser.roles is a string[] type
        console.log(this.newUser.roles);

        this.userService.addUserWithRoles(this.newUser).subscribe(
            (response) => {
                console.log('User added successfully:', response);
                // Optionally, perform any other actions after successful addition
                // Reset the form after submission
                // this.newUser = new AddUserRequest();
                // Optionally, navigate to a different route after successful addition
                // this.router.navigate(['/some-route']);
            },
            (error) => {
                console.error('Error adding user:', error);
                // Handle error response
            }
        );
    }


    navigateToList() {
        this.router.navigate(['/uikit/user/list']);
    }
}
