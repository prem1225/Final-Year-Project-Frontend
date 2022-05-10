import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: any[] = [];
  verified:Boolean=true;
  responseFromServer:any;
popoverTitle:string="Your email is not varified";
popoverMessage:string="You need to verify your mail before login";
cancelClicked=false;
username:any;
OTPnum:any;
mailStatus:any;
userActive:Boolean=false;

  constructor(private authService:AuthService,private tokenStorageService:TokenStorageService ,private router:Router,private userService:UserService)  { }

  ngOnInit(): void {
   
  }
   onSubmit(){ 
     this.authService.login(this.form).subscribe(
       res =>{
         
         this.roles = res.roles;
         this.mailStatus=res.status;
         this.userActive=res.active;
        
      //  if(this.userActive==true){
         if(this.mailStatus==true){  
      if((this.roles.includes('ROLE_ADMIN') || (this.roles.includes('ROLE_HOSPITAL'))||(this.roles.includes('ROLE_DOCTOR')))){     
      this.tokenStorageService.saveToken(res.token);
      this.tokenStorageService.saveUser(res);
      this.verified=true;
      window.location.replace('/homepage');
        }
        else{         
          alert("You are not authorized to login");
      
        }
         }
     
         else{
          
           alert("Your mail is not verified!!! Please verify it");
           this.verified=false;
          
         }
  
       
       },
       err=>{
        
        alert("Username or Password don't match!!  Please recheck and try again");
        this.router.navigate(['/login']);
       }
     );
   }
 
   VerifyEmail(){

    this.userService.verifyMail(this.username,this.OTPnum).subscribe(
      res=>{
        this.responseFromServer=res;
        console.log(res);
       if(this.responseFromServer="Verified"){       
          alert("Your mail is verified. Proceed to login");
      this.verified=true;
      }
      else{
        alert("OTP number associated with username not found");
      }
      },err=>{
        console.log(err);
      }
    );
   }
  getBackToLogin(){

    this.verified=true;
    this.router.navigate(['/login']);
   }
  }