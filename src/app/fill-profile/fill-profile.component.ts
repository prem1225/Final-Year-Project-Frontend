import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.css']
})
export class FillProfileComponent implements OnInit {

  currentUser:any;
  role:string[]=[];
  admin:boolean=false;
  hospitalInfo:any;
  doctorInfo:any;
  id:any;
    progress:any;
    username:any;
    email:any;
    fullname:any;
    regNum:any;
    panNum:any;
    mobileNum:any;
    address:any;
    city:any;
    district:any;
    contactNumP:any;
    newContact:any;
    doctor:boolean=false;
    gender:any;
    specialist:any;
    contact:any
    hospital:boolean=false;
    constructor(private tokenStorageService:TokenStorageService ,private snackBar:MatSnackBar, private userService:UserService) { }
  
    ngOnInit(): void {
 
      this.currentUser=this.tokenStorageService.getUser();
      this.role=this.currentUser.roles;
      this.username=this.currentUser.username;
      this.id=this.currentUser.userID;
  this.email=this.currentUser.email;
  this.contactNumP=this.currentUser.contact;
    }
    Fill(){
      if(this.role.includes('ROLE_ADMIN')){
        this.admin=true;
      }
      else if(this.role.includes('ROLE_HOSPITAL')) {
        this.hospital=true;
        this.userService.getHospitalProfile(this.username).subscribe(
          res=>{
           
  this.hospitalInfo=res;
  this.fullname=this.hospitalInfo.hName;
  this.regNum=this.hospitalInfo.regNum;
  this.panNum=this.hospitalInfo.panNum;
  this.address=this.hospitalInfo.address;
  this.city=this.hospitalInfo.city;
  this.district=this.hospitalInfo.district;
  this.mobileNum=this.hospitalInfo.contact;
  this.email=this.hospitalInfo.email;
          },
       err=>{

      });
    }
    else if(this.role.includes('ROLE_DOCTOR')){
      this.doctor=true;
      this.userService.fillProfileDoctor(this.id,this.fullname,this.username,this.regNum,this.contact,this.address,this.specialist,this.gender,this.email).subscribe(
        res=>{
          console.log(res);
 
        },
        err=>{
  console.log(err);
        }
      );
    }
    }
    Cancle(){
      window.location.replace("/profile");
    }
    
    }
    
  


