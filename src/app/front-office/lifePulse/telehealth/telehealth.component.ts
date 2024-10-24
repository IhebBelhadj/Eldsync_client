import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TelehealthRoomComponent} from "../telehealthRoom/telehealth.component";
import {TelehealthDataService} from "../../services/telehealth-data.service";


@Component({
  selector: 'app-telehealth',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    TelehealthRoomComponent,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  templateUrl: './telehealth.component.html',
  styleUrl: './telehealth.component.scss'
})

export class TelehealthComponent implements OnInit {
  inviteCode: string;

  constructor(private router: Router, private route: ActivatedRoute, private telehealthDataService: TelehealthDataService) { }

  ngOnInit(): void {
    // You can initialize inviteCode here if needed


  }

  joinRoom(): void {
    this.inviteCode = (document.querySelector('#inviteCode') as HTMLInputElement).value.trim();

    if (!this.inviteCode) {
      console.error('Invite code is required');
      return;
    }
    this.telehealthDataService.inviteCode =  this.inviteCode;
    // Check if the room already exists
    this.telehealthDataService.getVideoRoomByInviteCode(this.inviteCode).subscribe(
        (room) => {
          if (room) {
            // Room exists, join the room
            console.log('Room already exists, joining room:', room);
            this.join(this.inviteCode);
          } else {
            // Room does not exist
            this.createAndJoinRoom(this.inviteCode);
          }
        },
        (error) => {
          console.error('An error occurred while checking room existence:', error);
        }
    );
  }

  createAndJoinRoom(inviteCode: string): void {
    // Create the room
    const newRoom = { inviteCode: inviteCode /* other properties if needed */ };
    this.telehealthDataService.createVideoRoom(newRoom).subscribe(
        (createdRoom) => {
          console.log('Room created successfully:', createdRoom);
          this.join(inviteCode);
        },
        (error) => {
          console.error('An error occurred while creating room:', error);
        }
    );
  }

  join(inviteCode: string): void {
    // Log the router link before navigating
    console.log('Navigating to:', ['room', inviteCode], { relativeTo: this.route });

    // Navigate to the room using the invite code and relative route
    this.router.navigate(['room', inviteCode], { relativeTo: this.route });
  }
}


