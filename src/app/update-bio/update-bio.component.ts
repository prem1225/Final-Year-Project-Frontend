import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-update-bio',
  templateUrl: './update-bio.component.html',
  styleUrls: ['./update-bio.component.css']
})
export class UpdateBioComponent implements OnInit {

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
    hospital:boolean=false;
    constructor(private tokenStorageService:TokenStorageService ,private snackBar:MatSnackBar, private userService:UserService) { }
  
    ngOnInit(): void {
 
      this.currentUser=this.tokenStorageService.getUser();
      this.role=this.currentUser.roles;
      this.username=this.currentUser.username;
  this.email=this.currentUser.email;
  this.contactNumP=this.currentUser.contact;
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
      this.userService.getDoctorProfile(this.username).subscribe(
        res=>{
          console.log(res);
  this.doctorInfo=res;
  this.fullname=this.doctorInfo.fullname;
  this.regNum=this.doctorInfo.regnum;
  this.mobileNum=this.doctorInfo.contact;
  this.gender=this.doctorInfo.gender;
  this.email=this.doctorInfo.email;
  this.specialist=this.doctorInfo.specialist;
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
    Update(){
      if(this.role.includes('ROLE_DOCTOR')){
        this.UpdateDoctor();
      }
      else if(this.role.includes('ROLE_HOSPITAL')){
        this.UpdateHospital();
      }
    
    }
    UpdateDoctor(){
      this.userService.updateDoctorProfile(this.username,this.fullname,this.regNum,this.specialist, this.gender, this.mobileNum).subscribe(
        res=>{
          
     this.snackBar.open(res.message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['success-snackBar'],
    });
 window.location.replace("/profile");
        },
        err=>{
         console.log(err);
        }
      )
      
    
    }
      UpdateHospital(){
      this.userService.updateHospitalProfile(this.username,this.fullname,this.regNum,this.panNum,this.address,this.city,this.district,this.mobileNum).subscribe(
        res=>{
          
     this.snackBar.open(res.message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['success-snackBar'],
    });
 this.ngOnInit();
        },
        err=>{
         console.log(err);
        }
      )
      
    }
    UpdateContact(){
      this.userService.updateContact(this.contactNumP).subscribe(
       
        res=>{
console.log(res);
window.location.replace("/profile");
        }
      ,
      err=>{
            console.log(err);
      
    });
  }
}
