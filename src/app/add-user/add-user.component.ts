import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  username:any;
  password:any;
  email:any;
  contact:any;
  hospital:boolean=false;
 doctor:boolean=false;
 admin:boolean=false;
  role:any[]=[];
  select:any[]=[];
  currentUser:any;
  addingRolesToTheNewUser:any[]=[];
  responseFromServer:any;

  constructor(private userService:UserService,private router:Router,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser=this.tokenStorage.getUser();
    this.role=this.currentUser.roles;
    if(this.role.includes('ROLE_HOSPITAL')){
      this.hospital=true;
      this.doctor=false;
      this.admin=false;
    }
    else if(this.role.includes('ROLE_DOCTOR')){
      this.hospital=false;
      this.doctor=true;
      this.admin=false;
    }
    else{
      this.hospital=false;
      this.doctor=false;
      this.admin=true;
    }
  }
addUser(){

this.userService.signUp(this.username,this.password,this.email,this.contact,this.addingRolesToTheNewUser).subscribe(
  res=>{
    this.responseFromServer=res;
    alert(this.responseFromServer);
  },err=>{

    console.log(err);
  }
);
}
selectChange(event:any){

  if(event.target.checked){
  this.select=event.target.value;
  this.addingRolesToTheNewUser.push(this.select);
  alert(this.addingRolesToTheNewUser);

  }else{
    const index = this.addingRolesToTheNewUser.indexOf(event.target.value);
    this.addingRolesToTheNewUser.splice(index,1);

  }
  
}
}