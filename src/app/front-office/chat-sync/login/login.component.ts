import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../../../../service/webSocket.service";
import { UserService } from "../../../../service/login.service";
import {Users} from "../../../../api/users";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    nickname: string;
    fullname: string;


    constructor(private websocketService: WebsocketService, private userService: UserService) {}

    ngOnInit(): void {

    }

    connect(event: any): void {
        this.nickname = (document.querySelector('#nickname') as HTMLInputElement).value.trim();
        this.fullname = (document.querySelector('#fullname') as HTMLInputElement).value.trim();

        if (this.nickname && this.fullname) {
            // Connect to WebSocket
            this.websocketService.connect(this.nickname, this.fullname);

            // Set user data
            this.userService.userData = { fullname: this.fullname, nickname: this.nickname };
        }

        event.preventDefault();
    }
}
