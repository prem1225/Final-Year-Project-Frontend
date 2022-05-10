import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComplainComponent } from './add-complain/add-complain.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ComplainComponent } from './complain/complain.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { FillProfileComponent } from './fill-profile/fill-profile.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HospitalReqComponent } from './hospital-req/hospital-req.component';
import { LoginComponent } from './login/login.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { PatientApprovedComponent } from './patient-approved/patient-approved.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientRegComponent } from './patient-reg/patient-reg.component';
import { ProfileComponent } from './profile/profile.component';
import { PushMessageComponent } from './push-message/push-message.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { ShowPatientFileComponent } from './show-patient-file/show-patient-file.component';
import { UpdateBioComponent } from './update-bio/update-bio.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path:'sendPassword' , component: AdminChangePasswordComponent },
  { path: '', redirectTo:"/login" , pathMatch:'full'},
  { path: 'addUser', component:AddUserComponent },
  { path:'changePassword', component:ChangePasswordComponent},
  { path:'user', component:UsersComponent },
  { path:'user1/:id', component:UsersComponent },
  { path:'user2/:id', component:UsersComponent },
  { path:'user3/:id', component:UsersComponent },
  { path:'user4/:id', component:UsersComponent },
  {path:'forgetPassword',component:ForgetPasswordComponent}, 
  {path:'sendMail', component:SendMailComponent},
  {path:'profile',component:ProfileComponent},
  {path:'pushMsg', component:PushMessageComponent},
  {path:'complain', component:ComplainComponent},
  {path:'hospital', component:HospitalReqComponent},
  {path:'addComplain', component:AddComplainComponent},
  {path:'noticeboard',component:NoticeBoardComponent},
  {path:'homepage',component:HomepageComponent },
  {path:'changeMail',component:UpdateEmailComponent },
  {path:'updateProfile',component:UpdateBioComponent },
  {path:'doctor', component:DoctorListComponent},
  {path:'patients', component:PatientListComponent},
  { path:'patients1/:id', component:PatientListComponent },
  { path:'patients2/:id', component:PatientListComponent },
  { path:'patients3/:id', component:PatientListComponent },
  { path:'patientReq', component:PatientRegComponent},
  { path:'patientApproved', component:PatientApprovedComponent},

   { path:'fillProfile', component:FillProfileComponent},
   { path:'showReport/:id', component:ShowPatientFileComponent}
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
