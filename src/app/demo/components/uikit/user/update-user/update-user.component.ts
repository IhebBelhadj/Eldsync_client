import { Component } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  userId!: number;
  user!: User;
  isEditMode: boolean = false;
  constructor(private route: ActivatedRoute, private userService: UserService,private router:Router) { }
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']; // Assuming the user ID is passed as a route parameter
    this.loadUser();
  }

  loadUser() {
    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        this.user = user;
        this.isEditMode = true; // Set edit mode to true when user data is loaded
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(data => {
      this.gotolist();
    })
  }
  gotolist(){
    this.router.navigate(['/uikit/user/list']);
  }
  navigateToList() {
    this.router.navigate(['/uikit/user/list']);
  }


  
}
