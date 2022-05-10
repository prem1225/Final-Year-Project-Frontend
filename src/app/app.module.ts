import { NgModule } from '@angular/core';

 
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersComponent } from './users/users.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
// import {MatSnackBar, matSnackBarAnimations, MatSnackBarModule} from '@angular/material/snack-bar'; 

import { SendMailComponent } from './send-mail/send-mail.component';
import { PushMessageComponent } from './push-message/push-message.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { HospitalReqComponent } from './hospital-req/hospital-req.component';
import { ComplainComponent } from './complain/complain.component';
import { AddComplainComponent } from './add-complain/add-complain.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { UpdateBioComponent } from './update-bio/update-bio.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientRegComponent } from './patient-reg/patient-reg.component';
import { PatientApprovedComponent } from './patient-approved/patient-approved.component';
import { FillProfileComponent } from './fill-profile/fill-profile.component';
import { ShowPatientFileComponent } from './show-patient-file/show-patient-file.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    HomepageComponent,
    AdminChangePasswordComponent,
    ProfileComponent,
    ChangePasswordComponent,
    AddUserComponent,
    UsersComponent,
    ForgetPasswordComponent,
    SendMailComponent,
    PushMessageComponent,
    HospitalReqComponent,
    ComplainComponent,
    AddComplainComponent,
    NoticeBoardComponent,
    UpdateBioComponent,
    UpdateEmailComponent,
    DoctorListComponent,
    PatientListComponent,
    PatientRegComponent,
    PatientApprovedComponent,
    FillProfileComponent,
    ShowPatientFileComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule, 
    MatSnackBarModule, 
    FormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
       // set defaults here 
      }),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
