import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentUser:any;
  username:any;
  newPassword:any;
  confirmPassword:any;
  responseFromServer:any;

  constructor(private tokenStorageService:TokenStorageService , private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser=this.tokenStorageService.getUser();
    this.username=this.currentUser.username;
    
  }
ChangePassword(){

  this.userService.changePassword(this.username,this.newPassword,this.confirmPassword).subscribe(
    res=>{
      console.log(res);
this.responseFromServer=res;
if(res=="Sucess"){
  alert("Password  has been successfully!!!");
  window.location.replace('/homePage');
}
else{
  alert("Password do not matches.. Please try again");
}      
    },
    err=>{
     console.log(err);
    }
  );
}
}
