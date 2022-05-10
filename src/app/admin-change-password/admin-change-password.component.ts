import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {
id:any;
email:any;
responseFromServer:any;
admin:Boolean=false;
currentUser:any;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
   
  }

  resetPassword()
{
this.userService.resetPasswordByAdmin(this.id,this.email).subscribe(
  res=>{
    this.responseFromServer=res.message;


    alert(this.responseFromServer);
  },
  err=>{
    alert(err);
  }
);

}
  }

