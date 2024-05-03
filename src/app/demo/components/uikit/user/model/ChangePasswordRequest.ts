export class ChangePasswordRequest {
    userId: number;
    currentPassword: string;
    newPassword: string;
  
    constructor() {
      this.userId = 0;
      this.currentPassword = '';
      this.newPassword = '';
    }
}