import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Gender, Role, Status, User } from '../model/user';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers: [MessageService]

})
export class ListUserComponent {
  
   users:User[]=[];
   Gender = Gender;
   Status = Status;
   selectedUsers: User[] = [];
   Role = Role; // Make sure to import Gender enum
   cols: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'email', header: 'Email' },
    { field: 'username', header: 'User Name' },
    { field: 'gender', header: 'Gender' },
    { field: 'phone', header: 'Contact Info' },
    { field: 'firstName', header: 'First Name' },
    { field: 'lasteName', header: 'Last Name' },
    { field: 'cin', header: 'CIN' }
];
deleteSelectedUsersDialog: boolean = false;

// Flag to control the visibility of the confirmation dialog
deleteProductDialog: boolean = false;
// Store the user to be deleted
userToDelete: User;
  constructor(private userservice : UserService,private router:Router,  private messageService: MessageService){}
  
  ngOnInit() {
    this.userservice.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
  showConfirmationDialogForSelectedUsers() {
    this.deleteSelectedUsersDialog = true;
  }

  cancelDeleteSelectedUsers() {
    this.deleteSelectedUsersDialog = false;
  }

   // Method to show the confirmation dialog
   showConfirmationDialog(user: User) {
    // Store the user to be deleted
    this.userToDelete = user;
    // Open the confirmation dialog
    this.deleteProductDialog = true;
  }
   // Method to handle canceling the deletion
   cancelDelete() {
    // Close the confirmation dialog
    this.deleteProductDialog = false;
    // Clear the stored user
    this.userToDelete = null;
  }
  private  getusers() {
    this.userservice.getAllUsers().subscribe(data =>{this.users = data})
  }
  updateUser(id:number){
this.router.navigate(['/uikit/user/updateUser',id]);
  }
  deleteUser(id: number) {
    this.userservice.deleteUser(id).subscribe(data => {
        console.log(data);
        this.getusers();
    });
}
  navigateToAddUser() {
    this.router.navigate(['/uikit/user/add']);
  }
  confirmDelete() {
    // Close the confirmation dialog
    this.deleteProductDialog = false;
    // Check if a user is stored
    if (this.userToDelete) {
      // Delete the user
      this.userservice.deleteUser(this.userToDelete.id).subscribe(data => {
        console.log(data);
        // Refresh the user list
        this.getusers();
        // Clear the stored user
        this.userToDelete = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      });
    }
  }
  
 
  confirmDeleteSelectedUsers() {
    this.deleteSelectedUsersDialog = false;
    // Loop through selected users and delete them
    this.selectedUsers.forEach(user => {
      this.userservice.deleteUser(user.id).subscribe(data => {
        console.log(data);
      });
    });
    // Refresh the user list
    this.getusers();
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users are Deleted', life: 3000 });
  
    // Clear the selected users
    this.selectedUsers = [];
  }
  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
 // Method to handle column sorting
 sortColumn(field: string) {
  // Check if the column is already sorted
  const index = this.cols.findIndex(col => col.field === field);
  const sortOrder = this.cols[index].sortOrder || 1;
  // Toggle the sorting order
  this.cols.forEach(col => {
    col.sortOrder = 0;
  });
  this.cols[index].sortOrder = sortOrder === 1 ? -1 : 1;
  // Sort the user array based on the selected field and sorting order
  this.users.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    if (aValue < bValue) return -1 * sortOrder;
    if (aValue > bValue) return 1 * sortOrder;
    return 0;
  });
}

}
