import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { ProfilComponent } from './profil/profil.component';
import { SignupComponent } from './singup/singup.component';
import { FrontComponent } from '../../front/front.component';
import { NURSEComponent } from './nurse/nurse.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';



@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild([
    { path: '', component: UserComponent },
    { path: 'model',component: ImageUploadComponent},
    { path: 'add', component: AddUserComponent },
    { path: 'list', component: ListUserComponent },
    { path: 'updateUser/:id',component: UpdateUserComponent },
    { path: 'login',component: LoginComponent },
    { path:'signup', component: SignupComponent },
    { path: 'profile',component: ProfilComponent,},
    { path: 'front',canActivate: [AuthGuardService],component: FrontComponent},
    { path: 'nurse',canActivate: [AuthGuardService],component: NURSEComponent},
    { path: 'doctor',canActivate: [AuthGuardService],component: DoctorComponent}


  ])
    
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }

