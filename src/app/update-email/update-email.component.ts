import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {
  currentUser: any;
  oldMail: any;
  newEmail: any;
  oldEmail: any;
  id: any;
  isOtpGenerated: boolean = false;
  isLoading: boolean = false;
  otpNum:any
  username:any

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private route: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.id = this.currentUser.userID;
    this.username=this.currentUser.username;

  }
  changeEmail() {
    this.isLoading = true;
    this.userService.updateMail(this.oldEmail, this.newEmail).subscribe(
      res => {

      
        if (res.message == "Sucess") {

          this.isLoading = false;
          this.isOtpGenerated = true;
          // this.snackBar.open("OTP has been send please new mail" ,'Dismiss',{
          //       duration: 4000,
          //       verticalPosition: 'top',
          //       horizontalPosition: 'right',
          //       panelClass:['success-snackBar'],
          //     });
          //     setTimeout(()=>{

          //     },500);
          // this.verifyEmail();
        }
        else {
          this.isLoading = false;
          this.isOtpGenerated = false;
          this.snackBar.open(res.message,'Dismiss',{
               duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['red-snackBar']
          });
         
    }
      },
      err => {
        console.log(err);
      }
    );
  }
  verifyEmail() {
    this.isLoading=true;
    this.userService.updateMailOTP(this.newEmail,this.otpNum).subscribe(
      (res:any)=>{
    this.isLoading=false;
    if(res.message=="Congrulation Email has been verified"){
      this.snackBar.open(res.message,'Dismiss',{
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass:['success-snackBar'],
      });
      setTimeout(()=>{
       
      },500000);
    }
    else{
      this.isLoading=false;
      this.snackBar.open("OTP did not match ",'Dismiss',{
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass:['red-snackBar'],

      });
    }
      },
      err =>{
        this.isLoading = false;
        this.snackBar.open(err.message,'Dismiss',{

          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
        });
      }
    );
  }
}

