import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
currentUser:any;
role:string[]=[];
adminInfo:any;
admin:boolean=false;
hospital:boolean=false;
doctor:boolean=false;
hospitalInfo:any;
doctorInfo:any;
profilePicLink:any;
retriveImage:any;

id:any;
  uploadDir:any;
  retrievedImage:any;
  profilePic:any;
  selectedFile:any;
  isSelectedFile:any;
  progress:any;
  username:any;
  gender:any;
  email:any;
  fullname:any;
  regNum:any;
  panNum:any;
  mobileNum:any;
  address:any;
  city:any;
  district:any;
  document:any;
  contactNumP:any;
  edit:Boolean=false;
  userContact:any;
  userInfo:any;
  specialist:any;
  hasProfileImage:Boolean = false;
  userID:any;
  newDoctor:boolean=false;
  
  constructor(private tokenStorageService:TokenStorageService ,private snackBar:MatSnackBar, private userService:UserService) { }

  ngOnInit(): void {
 
    this.currentUser=this.tokenStorageService.getUser();
    this.role=this.currentUser.roles;
    this.username=this.currentUser.username;
    this.userService.UserInfo().subscribe(
      res=>{
        this.userInfo=res;
        this.contactNumP=this.userInfo.contact;
        this.email=this.userInfo.email;
        this.userID=this.userInfo.userID;
        
        
      },
      err=>{
        console.log(err);
      }
    )
    this.getProfileInfo();
    

    if(this.role.includes('ROLE_ADMIN')){
      this.admin=true;
      // this.userService.AdminInfo().subscribe(
      //   res =>{
      //     this.adminInfo=res;
      //     this.email= this.adminInfo.email;
      //   }
      // );
      
    }
    else if(this.role.includes('ROLE_HOSPITAL')) {
      this.hospital=true;
      this.userService.getHospitalProfile(this.username).subscribe(
        res=>{
        console.log(res);
this.hospitalInfo=res;
this.fullname=this.hospitalInfo.hName;
this.regNum=this.hospitalInfo.regNum;
this.panNum=this.hospitalInfo.panNum;
this.address=this.hospitalInfo.address;
this.city=this.hospitalInfo.city;
this.district=this.hospitalInfo.district;
this.mobileNum=this.hospitalInfo.contact;
this.email= this.hospitalInfo.email;

        },
     err=>{

    });
  }
  // add.getFullname(),
  // username,
  // add.getRegnum(),
  //  add.getContact(),
  //  add.getAddress(),
  //  add.getSpecialist()
  //  ,add.getGender()
  //  ,email);
  else if(this.role.includes('ROLE_DOCTOR')){
    this.doctor=true;
    this.userService.getDoctorProfile(this.username).subscribe(
      res=>{
     if(res==null){
      this.newDoctor=true;
     }
     else{
this.doctorInfo=res;
this.fullname=this.doctorInfo.fullname;
this.regNum=this.doctorInfo.regnum;
this.mobileNum=this.doctorInfo.contact;
this.gender=this.doctorInfo.gender;
this.address=this.doctorInfo.email;
this.specialist=this.doctorInfo.specialist;
console.log(this.specialist);
     }
      },
      err=>{

      }
    );
  }
    else{
      
    }
  }


  selectFileHandler(event:any){
    this.selectedFile=event.target.files[0];
    this.isSelectedFile=true;
  }

  uploadProfilePicture(){
    const uploadProfileImage:FormData = new FormData();
    uploadProfileImage.append('file',this.selectedFile, this.selectedFile.name);
    this.userService.addProfilePic(this.currentUser.username,uploadProfileImage).subscribe(
    (res:any)=>{
   
     this.snackBar.open(res.message, 'Dismiss', {
       duration: 4000,
       verticalPosition: 'bottom',
       horizontalPosition: 'right',
       panelClass: ['success-snackBar'],
     });
   //  this.refresh();
   //  this.isLoading = false;
   window.location.reload();
   
    },
    err =>{
    this.progress = 0;
    this.snackBar.open(err.body.message,'Dismiss',{
    duration: 4000,
    verticalPosition: 'bottom',
    horizontalPosition: 'right',
    panelClass:['red-snackBar'],
    });
    
     setTimeout(()=>{
    window.location.reload();
    },5000)
    }
    ); 
     
    
  }
  // changeProfilePicture(){

  //     // this.isLoading = true;
  //    const uploadProfileImage:FormData = new FormData();
  //    uploadProfileImage.append('file',this.selectedFile, this.selectedFile.name);
  //    this.userService.changeProfilePic(this.currentUser.userId,uploadProfileImage).subscribe(
  //    (res:any)=>{
  //   console.log(res);
  //     this.snackBar.open(res.message, 'Dismiss', {
  //       duration: 4000,
  //       verticalPosition: 'bottom',
  //       horizontalPosition: 'right',
  //       panelClass: ['success-snackBar'],
  //     });
  //   //  this.refresh();
  //   //  this.isLoading = false;
  //   // window.location.reload();
    
  //    },
  //    err =>{
  //    this.progress = 0;
  //    this.snackBar.open(err.body.message,'Dismiss',{
  //    duration: 4000,
  //    verticalPosition: 'bottom',
  //    horizontalPosition: 'right',
  //    panelClass:['red-snackBar'],
  //    });
     
  //     setTimeout(()=>{
  //    window.location.reload();
  //    },5000)
  //    }
  //    ); 
  //     }
  changeProfilePic(){

    console.log(this.currentUser.id);
    const uploadProfileImage:FormData = new FormData();
    uploadProfileImage.append('profile',this.selectedFile, this.selectedFile.name);
    this.userService.changeProfilePic(this.currentUser.id,uploadProfileImage).subscribe(
     (res: HttpEvent<any>) =>{
  
      switch(res.type){
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
  
          break;
        case HttpEventType.Response:
  
          this.snackBar.open(res.body.message,'Dismiss',{
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass:['success-snackBar'],
   
          });
  
          setTimeout(()=>{
             window.location.reload();
          },5000)
          break;
        
          default:
          console.log(res.type);
      }
      },
      err =>{
          console.log(err);
      }
    );
  
  }



hideProfile(){
  this.edit=true;
}
getProfileInfo(){
  this.userService.getProfilePicture(this.currentUser.id).subscribe(
   res =>{
     
     this.profilePicLink=res.fileDirectory;
     if(this.profilePicLink==null){
       this.hasProfileImage = false;
     }else{
      this.userService.downloadProfilePic(this.profilePicLink).subscribe(
        res =>{
          this.hasProfileImage = true;
         this.createImageFromBLOB(res);
        },
        err =>{
        console.log(err);
        }
      );
     }
    
   },
   err=>{
     this.profilePicLink = null;
     this.hasProfileImage = false;
     console.log(err);
   }

  );
}
createImageFromBLOB(image:Blob){
  let reader=new FileReader();
  reader.addEventListener("load",()=>{
this.retriveImage=reader.result;
this.hasProfileImage = true;
  },false);
  if(image){
    reader.readAsDataURL(image);
  }
}

onSubmit(){
  
}


}
