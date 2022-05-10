import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email:any = null;
  username:any = null;
  contact:any=null;
  responseFromServer:any;
  isOtpGenerated:boolean = false;
  otpnum:any;

  isLoading:boolean = false;

  constructor(private userService:UserService,private router:Router ,private snackBar:MatSnackBar ) { }

  ngOnInit(): void {
  }
  generateOTP(){
this.isLoading=true;
this.userService.generateOTP(this.username,this.email,this.contact).subscribe(
  (res:any)=>{
   
    this.responseFromServer=res.message;
    if(this.responseFromServer=="OTP has been send to email Please check your mail inbox"){
      this.isLoading=false;
      this.isOtpGenerated=true;
    }
    else{
      this.isLoading=false;
      this.isOtpGenerated=false;
      this.snackBar.open(res.message,'Dismiss',{
        duration:4000,
        verticalPosition:'top',
        horizontalPosition:'right',
        panelClass:['red-snackBar'],

      });
    }
    console.log(res);
  },
  err=>{

    this.isLoading=false;
    this.snackBar.open(err.message,'Dismiss',{
      duration:4000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass:['red-snackBar'],
    });
// setTimeout(()=>{
//   window.location.reload();
// },5000);
console.log(err);  
}
  
);
  }
  validateOTP(){
this.isLoading=true;
this.userService.validateOTP(this.username, this.otpnum ).subscribe(
  (res:any)=>{
this.isLoading=false;
if(res.message=="Check your email. We have send a new password. Use that password to login into the system and update it after login."){
  this.snackBar.open(res.message,'Dismiss',{
    duration: 4000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    panelClass:['success-snackBar'],
  });
  setTimeout(()=>{
    this.router.navigate(['/login']);
  },50000000);
  window.location.replace("/login");
  this.router.navigate(['/login']);
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
